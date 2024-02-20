import { useRef, useEffect, useState, useContext } from "react";
import { Box, Button, Switch, Image, Flex } from "@chakra-ui/react";
import "src/utils/phaser";
import { config } from "src/utils/phaser";
import { GlobalContext } from "src/context/global";
import { ConnectModalProvider } from "src/components/WalletConnectModal";
import { NAVBAR_HIGHT } from "src/utils/constants";
import useUserFomopolyData from "src/hooks/useUserFomopolyData";
import useUserActions from "src/hooks/useUserActions";
import GameMenu from "./GameMenu";
import { NumberType } from "src/types";
import getHeatMapColors from "src/utils/getHeatMapColors";
import dice from "src/assets/dice.png";
import { BalanceBoard } from "./BalanceBoard";
import { UserProfile } from "./UserProfile";

export const outterSharedMargin = 54;

export default function MainPage() {
  const hasInit = useRef(false);
  const [isHeatMapMode, setIsHeatMapMode] = useState(false);

  const {
    isConnectModalOpen,
    onConnectModalClose,
    selectingLandPurpose,
    setSelectingLandPurpose,
  } = useContext(GlobalContext);

  const { allLandPrices, landAmount, userOwnedLands, userSteps } =
    useUserFomopolyData();
  const { rollTheDice, buyLand } = useUserActions();

  useEffect(() => {
    const phaserContainer = document.getElementById("phaser-zone-fomopoly");
    if (!hasInit.current && phaserContainer && !window.fomopolyMap) {
      console.log("init phaser");
      const game = new Phaser.Game(config);
      console.log("game :", game);
      window.fomopolyMap = game.scene.keys.fomopolyMap;
      if (landAmount > 0) window.fomopolyMap.setLandAmount(landAmount);
    }
    hasInit.current = true;
  }, [hasInit, landAmount]);

  useEffect(() => {
    if (window.fomopolyMap && landAmount > 0) {
      window.fomopolyMap.setLandAmount(landAmount);
    }

    if (window.fomopolyMap && userSteps) {
      window.fomopolyMap.setUserPositionBySteps(userSteps);
    }

    if (window.fomopolyMap && userOwnedLands) {
      window.fomopolyMap.setOwnedLandTags(userOwnedLands);
    }
  }, [landAmount, userSteps, userOwnedLands]);

  const onHeatMapSwitchClick = () => {
    if (window.fomopolyMap) {
      const heatMapSteps = getHeatMapColors(allLandPrices);
      setIsHeatMapMode((prev) => !prev);
      window.fomopolyMap.setHeatMapMode(!isHeatMapMode, heatMapSteps);
    }
  };

  const onClickMove = async () => {
    await rollTheDice(NumberType.Any);
  };

  const onClickBuyLand = async () => {
    const hash = await buyLand();
    console.log("hash :", hash);
  };

  const shouldHideOptions = selectingLandPurpose != null;

  return (
    <ConnectModalProvider
      isOpen={isConnectModalOpen}
      onClose={onConnectModalClose}
    >
      <Box minH="100vh" pt="75px">
        <Box id="phaser-zone-fomopoly" position="relative">
          <Box
            position="absolute"
            bottom="20px"
            left="20px"
            color="white"
          ></Box>
        </Box>
      </Box>
      {shouldHideOptions ? (
        <Flex
          position="absolute"
          width="100%"
          justifyContent="center"
          bottom={`${outterSharedMargin}px`}
        >
          <Button
            onClick={() => {
              setSelectingLandPurpose(null);
            }}
          >
            Cancel
          </Button>
        </Flex>
      ) : (
        <Box position="absolute" w="100%" h="100%" top="0px">
          {!isHeatMapMode && <UserProfile />}

          {!isHeatMapMode && (
            <BalanceBoard
              position="absolute"
              top={`${outterSharedMargin + NAVBAR_HIGHT}px`}
              right={`${outterSharedMargin}px`}
              width="180px"
              height="52px"
            />
          )}
          {!isHeatMapMode && (
            <GameMenu
              position="absolute"
              width="60px"
              height="204px"
              right={`${outterSharedMargin}px`}
              top={`${156 + NAVBAR_HIGHT}px`}
              p="0px"
              m="0px"
            />
          )}
          {!isHeatMapMode && (
            <Button
              size="146px"
              position="absolute"
              bottom={`${outterSharedMargin + 146 + 30}px`}
              right={`${outterSharedMargin}px`}
              bg="none"
              onClick={onClickBuyLand}
              _hover={{}}
              _active={{ bg: "clear", transform: "scale(0.98)" }}
            >
              <Image src={dice}></Image>
            </Button>
          )}
          {!isHeatMapMode && (
            <Button
              size="146px"
              position="absolute"
              bottom={`${outterSharedMargin}px`}
              right={`${outterSharedMargin}px`}
              bg="none"
              onClick={onClickMove}
              _hover={{}}
              _active={{ bg: "clear", transform: "scale(0.98)" }}
            >
              <Image src={dice}></Image>
            </Button>
          )}
          <Switch
            position="absolute"
            left={`${outterSharedMargin}px`}
            bottom={`${outterSharedMargin}px`}
            size="lg"
            colorScheme="red"
            onChange={onHeatMapSwitchClick}
          />
        </Box>
      )}
    </ConnectModalProvider>
  );
}
