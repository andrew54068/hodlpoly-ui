import { useRef, useEffect, useState, useContext } from "react";
import { Box, Button, Switch, Image, Flex, Text } from "@chakra-ui/react";
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
import { LeaderBoard } from "./LeaderBoard";

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

  const {
    allLandPrices,
    refetchAllLandPrices,
    landAmount,
    userOwnedLands,
    refetchUserOwnedLands,
    userSteps,
  } = useUserFomopolyData();
  const { rollTheDice, buyLand } = useUserActions();

  useEffect(() => {
    const phaserContainer = document.getElementById("phaser-zone-fomopoly");
    if (!hasInit.current && phaserContainer && !window.fomopolyMap) {
      console.log("init phaser");
      const game = new Phaser.Game(config);
      console.log("game :", game);
      window.fomopolyMap = game.scene.keys.fomopolyMap;
      if (landAmount > 0) {
        window.fomopolyMap.setLandAmount(landAmount);
      }
    }

    hasInit.current = true;
  }, [hasInit, landAmount]);

  useEffect(() => {
    if (landAmount > 0 && window.fomopolyMap) {
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
    refetchAllLandPrices();
  };

  const onClickMove = async () => {
    await rollTheDice(NumberType.Any);
  };

  const onClickBuyLand = async () => {
    const hash = await buyLand();
    console.log("hash :", hash);
    refetchUserOwnedLands();
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
          {!isHeatMapMode && (
            <Flex
              position="absolute"
              w="100%"
              top={`${outterSharedMargin + NAVBAR_HIGHT}px`}
              justifyContent="space-between"
              alignItems="start"
              p="0px 52px"
            >
              <UserProfile />
              <LeaderBoard
                width="700px"
                height="52px"
                justifyContent="center"
              />
              <BalanceBoard width="180px" height="52px" />
            </Flex>
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
              width="146px"
              height="146px"
              position="absolute"
              bottom={`${outterSharedMargin + 146 + 30}px`}
              right={`${outterSharedMargin}px`}
              onClick={onClickBuyLand}
              _hover={{
                background:
                  "0px 25px 60px -15px rgba(3, 3, 3, 0.20), 0px 25px 60px -15px rgba(3, 3, 3, 0.12), 0px 0px 7px 0px #222",
                boxShadow:
                  "0px 25px 60px -15px rgba(16, 24, 40, 0.20), 0px 25px 60px -15px rgba(16, 24, 40, 0.12), 0px 0px 7px 0px #222",
                linearGradient: "(270deg, #FFF -26.8%, #000 30.45%)",
              }}
              _active={{
                background: "linear-gradient(270deg, #FFF -26.8%, #000 30.45%)",
                boxShadow:
                  "0px 25px 60px -15px rgba(16, 24, 40, 0.20), 0px 25px 60px -15px rgba(16, 24, 40, 0.12), -6px 1px 0px 0px rgba(0, 0, 0, 0.40) inset",
                transform: "scale(0.98)",
              }}
              boxShadow="0px 25px 60px -15px rgba(16, 24, 40, 0.20), 0px 25px 60px -15px rgba(16, 24, 40, 0.12)"
              background="linear-gradient(270deg, #FFF -26.8%, #000 30.45%)"
              borderRadius="16.22px"
            >
              <Flex direction="column" alignItems="center">
                <Image src={dice}></Image>
                <Text
                  color="#FFFFFF"
                  textAlign="center"
                  fontFamily="Inter"
                  fontSize="26px"
                  fontStyle="normal"
                  fontWeight="500"
                  lineHeight="35.689px"
                  letterSpacing="-0.72px"
                >
                  Buy Land!
                </Text>
              </Flex>
            </Button>
          )}
          {!isHeatMapMode && (
            <Button
              width="146px"
              height="146px"
              position="absolute"
              bottom={`${outterSharedMargin}px`}
              right={`${outterSharedMargin}px`}
              onClick={onClickMove}
              _hover={{
                background:
                  "0px 25px 60px -15px rgba(3, 3, 3, 0.20), 0px 25px 60px -15px rgba(3, 3, 3, 0.12), 0px 0px 7px 0px #222",
                boxShadow:
                  "0px 25px 60px -15px rgba(16, 24, 40, 0.20), 0px 25px 60px -15px rgba(16, 24, 40, 0.12), 0px 0px 7px 0px #222",
                linearGradient: "(270deg, #FFF -26.8%, #000 30.45%)",
              }}
              _active={{
                background: "linear-gradient(270deg, #FFF -26.8%, #000 30.45%)",
                boxShadow:
                  "0px 25px 60px -15px rgba(16, 24, 40, 0.20), 0px 25px 60px -15px rgba(16, 24, 40, 0.12), -6px 1px 0px 0px rgba(0, 0, 0, 0.40) inset",
                transform: "scale(0.98)",
              }}
              boxShadow="0px 25px 60px -15px rgba(16, 24, 40, 0.20), 0px 25px 60px -15px rgba(16, 24, 40, 0.12)"
              background="linear-gradient(270deg, #FFF -26.8%, #000 30.45%)"
              borderRadius="16.22px"
            >
              <Flex direction="column" alignItems="center">
                <Image src={dice}></Image>
                <Text
                  color="#FFFFFF"
                  textAlign="center"
                  fontFamily="Inter"
                  fontSize="36px"
                  fontStyle="normal"
                  fontWeight="500"
                  lineHeight="35.689px"
                  letterSpacing="-0.72px"
                >
                  GO!
                </Text>
              </Flex>
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
