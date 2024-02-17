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
import { getConnectedWalletClient, publicClient } from 'src/config/clients'
import GameMenu from "./GameMenu";
import { NumberType } from 'src/types'
import getHeatMapColors from 'src/utils/getHeatMapColors'

export default function Main() {
  const hasInit = useRef(false);
  const [isHeatMapMode, setIsHeatMapMode] = useState(false)
  const { isConnectModalOpen, onConnectModalClose } = useContext(GlobalContext)
  const { address = '' } = useAccount()

  const { allLandPrices, landAmount, userOwnedLands, userSteps } = useUserFomopolyData()

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
      console.log('allLandPrices :', allLandPrices);
      setIsHeatMapMode(prev => !prev)
      window.fomopolyMap.setHeatMapMode(!isHeatMapMode, heatMapSteps);
    }
  }

  const onClickMove = async () => {
    const contract = await getContractClient()
    if (!contract) return

    const [positionBeforeMove] = await contract.read.getPlayer([address])

    const hash = await contract.write.move([NumberType.Any])
    console.log('hash :', hash);
    await publicClient.waitForTransactionReceipt({ hash })

    const [positionAfterMove] = await contract.read.getPlayer([address])
    const steps = positionAfterMove - positionBeforeMove
    console.log('steps :', steps);

    if (window.fomopolyMap) {
      window.fomopolyMap.triggerMoveForward(steps);
    }
  }

  const onClickBuyLand = async () => {
    const contract = await getContractClient()
    if (!contract) return
    // @todo: check if the user has owned the land
    // @todo: get land price 
    const landPrice = allLandPrices[userSteps]
    console.log('landPrice :', landPrice);

    // @todo: check land price and balance before sending the tx
    const hash = await contract.write.buyLand([], { value: landPrice })
    console.log('hash :', hash);
  }


  return <ConnectModalProvider isOpen={isConnectModalOpen} onClose={onConnectModalClose}>
    <Box mt="75px" minH="100vh">
      <Flex mb="space.m" gap="16px">
        <Button onClick={onClickMove}>Move</Button>
        <Button onClick={onClickBuyLand}>Buy Land</Button>
        <GameMenu
          position="fixed"
          width="auto"
          maxW="container.sm"
          zIndex="docked"
          float="right"
          right="0px"
          top={`${NAVBAR_HIGHT}px`}
          m="2rem"
        />
      </Flex>
      <Box id="phaser-zone-fomopoly" position="relative">
        <Box
          position="absolute"
          top="20px"
          left="20px"
          color="white">
          <Switch size='lg' colorScheme='red' onChange={onHeatMapSwitchClick} />
        </Box>
      </Box>

    </Box>
  </ConnectModalProvider >
}