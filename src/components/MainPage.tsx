import { useRef, useEffect, useContext, useCallback } from "react";
import { Flex, Box, Button } from "@chakra-ui/react";
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
import Menu from "./Menu";
import { NumberType } from 'src/types'

export default function Main() {
  const hasInit = useRef(false);
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
    // @todo: get land price 
    const landPrice = allLandPrices[userSteps]
    console.log('landPrice :', landPrice);

    const hash = await contract.write.buyLand([], { value: landPrice })
    console.log('hash :', hash);

  }


  return <ConnectModalProvider isOpen={isConnectModalOpen} onClose={onConnectModalClose}>
    <Box mt="75px" minH="100vh">
      <Flex mb="space.m" gap="16px">
        <Button onClick={onClickMove}>Move</Button>
        <Button onClick={onClickBuyLand}>Buy Land</Button>
        <Menu
          position="fixed"
          width="auto"
          maxW="container.sm"
          zIndex="banner"
          float="right"
          right="0px"
          top={`${NAVBAR_HIGHT}px`}
          m="2rem"
        />
      </Flex>
      <div id="phaser-zone-fomopoly"></div>

    </Box>
  </ConnectModalProvider>
}