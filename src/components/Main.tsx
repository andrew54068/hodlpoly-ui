import { useRef, useEffect } from "react";
import { Box, Button } from "@chakra-ui/react";
import "src/utils/phaser";
import { config } from "src/utils/phaser";
import { NAVBAR_HIGHT } from "src/utils/constants";
import { Menu } from "./Menu";

export default function Main() {
  const hasInit = useRef(false);

  useEffect(() => {
    const phaserContainer = document.getElementById("phaser-example");
    if (!hasInit.current && phaserContainer && !window.myGameSceneDemo) {
      console.log("init phaser");
      const game = new Phaser.Game(config);
      window.myGameSceneDemo = game.scene.keys.demoExample;
    }
    hasInit.current = true;
  }, [hasInit]);

  const onClickMove = () => {
    if (window.myGameSceneDemo) {
      console.log("window.myGameSceneDemo :", window.myGameSceneDemo);

      window.myGameSceneDemo.triggerMoveForward(3);
    }
  };

  const moveToOrigin = () => {
    if (window.myGameSceneDemo) {
      window.myGameSceneDemo.moveToOrigin();
    }
  };

  return (
    <Box mt="75px" minH="100vh">
      <div id="phaser-example"></div>
      <Button onClick={onClickMove}>Move</Button>
      <Button onClick={moveToOrigin}>Back to origin</Button>
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
    </Box>
  );
}
