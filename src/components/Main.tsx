import { Box, Button } from "@chakra-ui/react";
import 'src/utils/phaser'
import { game } from 'src/utils/phaser'

export default function Main() {
  const onClickMove = () => {
    if (window.myGameSceneDemo) {
      console.log('window.myGameSceneDemo :', window.myGameSceneDemo);

      window.myGameSceneDemo.triggerMoveForward(3);
    }
  }
  return <Box mt="75px">
    <Button onClick={onClickMove}>Move</Button>
    <footer>
      <div id="phaser-example"></div>
    </footer>

  </Box>
}