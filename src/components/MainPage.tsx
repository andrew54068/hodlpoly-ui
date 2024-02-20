import { useRef, useEffect, useState, useContext, useCallback } from "react";
import { Flex, Box, Button, Switch } from "@chakra-ui/react";
import 'src/utils/phaser'
import { config } from 'src/utils/phaser'
import { GlobalContext } from 'src/context/global';
import { ConnectModalProvider } from "src/components/WalletConnectModal";
import { FOMOPOLY_ADDRESS_TESTNET } from 'src/constants'
import fomopolyAbi from 'src/abi/fomopoly'
import { getContract } from 'viem'
import { NAVBAR_HIGHT } from 'src/utils/constants'
import { useAccount } from 'wagmi'
import useUserFomopolyData from 'src/hooks/useUserFomopolyData';
import useUserActions from 'src/hooks/useUserActions';
import { getConnectedWalletClient, publicClient } from 'src/config/clients'
import GameMenu from "./GameMenu";
import { NumberType } from 'src/types'
import getHeatMapColors from 'src/utils/getHeatMapColors'

export default function MainPage() {
  const hasInit = useRef(false);
  const [isHeatMapMode, setIsHeatMapMode] = useState(false)

  const { isConnectModalOpen, onConnectModalClose } = useContext(GlobalContext)
  const { address = '' } = useAccount()

  const { userBalance, allLandPrices, landAmount, userOwnedLands, userSteps } = useUserFomopolyData()
  const { rollTheDice, buyLand } = useUserActions()

  const getContractClient = useCallback(async () => {
    const walletClient = await getConnectedWalletClient({ address })

    if (!walletClient) return
    const contract = getContract({
      address: FOMOPOLY_ADDRESS_TESTNET,
      abi: fomopolyAbi.abi,
      client: { public: publicClient, wallet: walletClient }
    })

    return contract
  }, [address])

  useEffect(() => {
    const phaserContainer = document.getElementById('phaser-zone-fomopoly');
    if (!hasInit.current && phaserContainer && !window.fomopolyMap) {
      console.log('init phaser');
      const game = new Phaser.Game(config);
      console.log('game :', game);
      window.fomopolyMap = game.scene.keys.fomopolyMap;
      if (landAmount > 0) window.fomopolyMap.setLandAmount(landAmount);
    }
    hasInit.current = true
  }, [hasInit, landAmount]);

  useEffect(() => {
    if (window.fomopolyMap && landAmount > 0) {
      window.fomopolyMap.setLandAmount(landAmount);
    }

    if (window.fomopolyMap && userSteps) {
      window.fomopolyMap.setUserPositionBySteps(userSteps)
    }

    if (window.fomopolyMap && userOwnedLands) {
      window.fomopolyMap.setOwnedLandTags(userOwnedLands)
    }
  }, [landAmount, userSteps, userOwnedLands])

  const onHeatMapSwitchClick = () => {
    if (window.fomopolyMap) {
      const heatMapSteps = getHeatMapColors(allLandPrices)
      setIsHeatMapMode(prev => !prev)
      window.fomopolyMap.setHeatMapMode(!isHeatMapMode, heatMapSteps);
    }
  }

  const onClickMove = async () => {
    await rollTheDice(NumberType.Any)
  }

  const onClickBuyLand = async () => {

    const hash = await buyLand()
    console.log('hash :', hash);
  }

  return <ConnectModalProvider isOpen={isConnectModalOpen} onClose={onConnectModalClose}>
    <Box mt="75px" minH="100vh">
      <Flex mb="space.m" gap="16px">


      </Flex>
      <Box id="phaser-zone-fomopoly" position="relative" mt="75px">
        <Box
          position="absolute"
          top="20px"
          left="20px"
          color="white">
          <Switch size='lg' colorScheme='red' onChange={onHeatMapSwitchClick} />
        </Box>
        <Button
          position="absolute"
          top="20px"
          right="20px"
          onClick={onClickMove}>Move</Button>
        <Button
          position="absolute"
          top="80px"
          right="20px"
          onClick={onClickBuyLand}>Buy Land</Button>
        <GameMenu
          position="absolute"
          width="auto"
          maxW="container.sm"
          zIndex="docked"
          right="20px"
          top="140px"
          p="0"
        />
      </Box>

    </Box>
  </ConnectModalProvider >
}