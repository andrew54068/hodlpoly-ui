import { useRef, useEffect, useState, useContext, useCallback } from "react";
import { Flex, Box, Button, Switch, Image, Text } from "@chakra-ui/react";
import "src/utils/phaser";
import { config } from "src/utils/phaser";
import { GlobalContext } from "src/context/global";
import { ConnectModalProvider } from "src/components/WalletConnectModal";
import { FOMOPOLY_PROXY_ADDRESS } from "src/constants";
import fomopolyAbi from "src/abi/fomopoly";
import { getContract } from "viem";
import { NAVBAR_HIGHT } from "src/utils/constants";
import { useAccount } from "wagmi";
import useUserFomopolyData from "src/hooks/useUserFomopolyData";
import useUserActions from "src/hooks/useUserActions";
import { getConnectedWalletClient, publicClient } from "src/config/clients";
import GameMenu from "./GameMenu";
import { NumberType } from "src/types";
import getHeatMapColors from "src/utils/getHeatMapColors";
import avatar from "src/assets/avatar.png";
import dice from "src/assets/dice.png";
import logo from "src/assets/logo.png";

export default function MainPage() {
  const hasInit = useRef(false);
  const [isHeatMapMode, setIsHeatMapMode] = useState(false);

  const { isConnectModalOpen, onConnectModalClose } = useContext(GlobalContext);
  const { address = "" } = useAccount();

  const { userBalance, allLandPrices, landAmount, userOwnedLands, userSteps } =
    useUserFomopolyData();
  const { rollTheDice, buyLand } = useUserActions();

  const getContractClient = useCallback(async () => {
    const walletClient = await getConnectedWalletClient({ address });

    if (!walletClient) return;
    const contract = getContract({
      address: FOMOPOLY_PROXY_ADDRESS,
      abi: fomopolyAbi.abi,
      client: { public: publicClient, wallet: walletClient },
    });

    return contract;
  }, [address]);

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

  return (
    <ConnectModalProvider
      isOpen={isConnectModalOpen}
      onClose={onConnectModalClose}
    >
      <Box mt="75px" minH="100vh">
        <Flex mb="space.m" gap="16px"></Flex>
        <Box id="phaser-zone-fomopoly" position="relative" mt="75px">
          <Box position="absolute" top="20px" left="20px" color="white">
            <Switch
              size="lg"
              colorScheme="red"
              onChange={onHeatMapSwitchClick}
            />
          </Box>
        </Box>

        <Button
          position="absolute"
          top="52px"
          left="52px"
          bg="clear"
          _hover={{}}
          _active={{ bg: "clear", transform: "scale(0.98)" }}
        >
          <Image src={avatar}></Image>
        </Button>
        <Button
          position="absolute"
          top={`${NAVBAR_HIGHT + 0}px`}
          right="52px"
          bg="clear"
          _hover={{}}
          _active={{ bg: "clear", transform: "scale(0.98)" }}
        >
          <Box
            width="180px"
            borderRadius="12px"
            border="4px solid #000"
            background="var(--Generic-White, #FFF)"
            boxShadow="0px 2px 6px 0px rgba(16, 24, 40, 0.06)"
            p="12px"
          >
            <Flex justifyContent="space-between" alignItems="center">
              <Image src={logo}></Image>
              <Text
                color="var(--Neutral-500, #6B7280)"
                fontSize="18px"
                fontStyle="normal"
                fontWeight="600"
                lineHeight="28px"
              >
                0.00
              </Text>
            </Flex>
          </Box>
        </Button>
        <GameMenu
          position="absolute"
          width="auto"
          maxW="container.sm"
          zIndex="docked"
          right="20px"
          top={`${NAVBAR_HIGHT + 20}px`}
          p="0px"
        />
        <Button
          position="absolute"
          bottom={`${NAVBAR_HIGHT + 250}px`}
          right="52px"
          bg="clear"
          onClick={onClickBuyLand}
          _hover={{}}
          _active={{ bg: "clear", transform: "scale(0.98)" }}
        >
          <Image src={dice}></Image>
        </Button>
        <Button
          position="absolute"
          bottom={`${NAVBAR_HIGHT + 52}px`}
          right="52px"
          bg="clear"
          onClick={onClickMove}
          _hover={{}}
          _active={{ bg: "clear", transform: "scale(0.98)" }}
        >
          <Image src={dice}></Image>
        </Button>
      </Box>
    </ConnectModalProvider>
  );
}
