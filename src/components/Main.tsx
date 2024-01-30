import { useRef, useEffect, useContext } from "react";
import { Box, Button } from "@chakra-ui/react";
import 'src/utils/phaser'
import { config } from 'src/utils/phaser'
import { GlobalContext } from 'src/context/global';
import { ConnectModalProvider } from "src/components/WalletConnectModal";
// import { getContract } from 'viem'
// import { FOMOPOLY_ADDRESS_TESTNET } from 'src/constants'
// import fomopolyAbi from 'src/abi/fomopoly'
// import { baseGoerli } from 'viem/chains'
// import { writeContract, prepareWriteContract } from '@wagmi/core'



export default function Main() {
  const hasInit = useRef(false);
  const { isConnectModalOpen, onConnectModalClose } = useContext(GlobalContext)

  useEffect(() => {
    const phaserContainer = document.getElementById('phaser-example');
    if (!hasInit.current && phaserContainer && !window.myGameSceneDemo) {
      console.log('init phaser');
      const game = new Phaser.Game(config);
      window.myGameSceneDemo = game.scene.keys.demoExample;
    }
    hasInit.current = true
  }, [hasInit]);

  const onClickMove = async () => {

    // if (window.myGameSceneDemo) {
    //   console.log('window.myGameSceneDemo :', window.myGameSceneDemo);

    //   window.myGameSceneDemo.triggerMoveForward(3);
    // }

    // send tx by viem
    // console.log('walletClient :', walletClient);
    // if (!walletClient) return
    // const contract = getContract({
    //   address: FOMOPOLY_ADDRESS_TESTNET,
    //   abi: fomopolyAbi.abi,
    //   publicClient,
    //   walletClient
    // })

    // const result = await contract.write.move()
    // console.log('result :', result);

    // send tx by wagmi

    // const { request } = await prepareWriteContract({
    //   address: FOMOPOLY_ADDRESS_TESTNET,
    //   abi: fomopolyAbi.abi,
    //   functionName: 'move',
    //   chainId: baseGoerli.id,

    // })
    // const { hash } = await writeContract(request)
    // console.log('hash :', hash);

  }

  const moveToOrigin = () => {
    if (window.myGameSceneDemo) {
      window.myGameSceneDemo.moveToOrigin();
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