import { useRef, useEffect, useContext } from "react";
import { Box, Button } from "@chakra-ui/react";
import 'src/utils/phaser'
import { config } from 'src/utils/phaser'
import { GlobalContext } from 'src/context/global';
import { ConnectModalProvider } from "src/components/WalletConnectModal";
import { FOMOPOLY_ADDRESS_TESTNET } from 'src/constants'
import fomopolyAbi from 'src/abi/fomopoly'
import { getContract, waitForTransactionReceipt } from 'viem'
import { useAccount } from 'wagmi'
import { getConnectedWalletClient, publicClient } from 'src/config/clients'


export default function Main() {
  const hasInit = useRef(false);
  const { isConnectModalOpen, onConnectModalClose } = useContext(GlobalContext)
  const { address } = useAccount()

  useEffect(() => {
    const phaserContainer = document.getElementById('phaser-example');
    if (!hasInit.current && phaserContainer && !window.fomopolyMap) {
      console.log('init phaser');
      const game = new Phaser.Game(config);
      window.fomopolyMap = game.scene.keys.fomopolyMap;
    }
    hasInit.current = true
  }, [hasInit]);

  const onClickMove = async () => {



    // send tx by viem
    const walletClient = await getConnectedWalletClient({ address })

    if (!walletClient) return
    const contract = getContract({
      address: FOMOPOLY_ADDRESS_TESTNET,
      abi: fomopolyAbi.abi,
      client: { public: publicClient, wallet: walletClient }
    })

    const [positionBeforeMove] = await contract.read.getPlayer([address])

    const hash = await contract.write.move()
    await publicClient.waitForTransactionReceipt({ hash })

    const [positionAfterMove] = await contract.read.getPlayer([address])
    const steps = positionAfterMove - positionBeforeMove

    if (window.fomopolyMap) {
      window.fomopolyMap.triggerMoveForward(steps);
    }

  }

  const moveToOrigin = () => {
    if (window.fomopolyMap) {
      window.fomopolyMap.moveToOrigin();
    }
  }

  return <ConnectModalProvider isOpen={isConnectModalOpen} onClose={onConnectModalClose}>
    <Box mt="75px" minH="100vh">
      <Button onClick={onClickMove}>Move</Button>
      <Button onClick={moveToOrigin}>Back to origin</Button>
      <div id="phaser-example"></div>

    </Box>
  </ConnectModalProvider>
}