import { useRef, useEffect, useState, useContext } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import "src/utils/phaser";
import { config } from "src/utils/phaser";
import { GlobalContext } from "src/context/global";
import MoveContext from "src/context/move";
import LoginContext from "src/context/login";
import GameUtils from "./GameUtils";
import getHeatMapColors from "src/utils/getHeatMapColors";
import useUserFomopolyData from "src/hooks/useUserFomopolyData";
import useUserActions from "src/hooks/useUserActions";
import { SelectingLandPurpose } from "src/types";
import PendingDiceModal from "src/components/PendingDiceModal";
import LoginModal from "src/components/LoginModal";

export const outterSharedMargin = 54;

export default function MainPage() {
  const { worldWideTravel } = useUserActions();
  const [isHeatMapMode, setIsHeatMapMode] = useState(false);
  const hasInit = useRef(false);

  const { selectingLandPurpose, setSelectingLandPurpose } =
    useContext(GlobalContext);

  const {
    isWaitingForMoving,
    setIsWaitingForMoving,
    currentMoveSteps,
    setCurrentMoveSteps,
  } = useContext(MoveContext);
  const { isLoginModalOpen, onLoginModalClose } = useContext(LoginContext);

  const { allLandPrices, landAmount, userOwnedLands, userSteps } =
    useUserFomopolyData();

  useEffect(() => {
    const phaserContainer = document.getElementById("phaser-zone-fomopoly");
    if (!hasInit.current && phaserContainer && !window.fomopolyMap) {
      const game = new Phaser.Game(config);
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
  };

  const onCancelLandSelection = () => {
    setSelectingLandPurpose(null);
    if (window.fomopolyMap) {
      window.fomopolyMap.closeSelectionMode();
    }
  };

  const onConfirmLandSelection = async () => {
    if (window.fomopolyMap) {
      window.fomopolyMap;
      const selectedTileId = window.fomopolyMap.board.selectedTileId;
      console.log("selectedTileId :", selectedTileId);

      if (selectingLandPurpose === SelectingLandPurpose.WorldWideTravel) {
        await worldWideTravel(selectedTileId);
      }

      window.fomopolyMap.closeSelectionMode();
      setSelectingLandPurpose(null);
    }
  };

  const shouldHideOptions = selectingLandPurpose != null;

  return (
    <>
      <Box minH="100vsh" pt="75px">
        <Box id="phaser-zone-fomopoly" position="relative">
          <GameUtils
            setCurrentMoveSteps={setCurrentMoveSteps}
            setIsWaitingForMoving={setIsWaitingForMoving}
            isHeatMapMode={isHeatMapMode}
            hideAllOptions={shouldHideOptions}
            outterSharedMargin={outterSharedMargin}
            onHeatMapSwitchClick={onHeatMapSwitchClick}
          />
        </Box>
      </Box>
      {/* //@todo: selection mode */}
      {shouldHideOptions && (
        <Flex
          p="40px"
          position="absolute"
          width="100%"
          gap="12px"
          pointerEvents="none"
          justifyContent="center"
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
          bottom={`${outterSharedMargin}px`}
        >
          <Button pointerEvents="auto" onClick={onCancelLandSelection}>
            Cancel
          </Button>
          <Button pointerEvents="auto" onClick={onConfirmLandSelection}>
            Confirm
          </Button>
        </Flex>
      )}

      <PendingDiceModal
        result={currentMoveSteps}
        setIsWaitingForMoving={setIsWaitingForMoving}
        setCurrentMoveSteps={setCurrentMoveSteps}
        isOpen={isWaitingForMoving}
        onClose={() => setIsWaitingForMoving(false)}
      />
      <LoginModal isOpen={isLoginModalOpen} onClose={onLoginModalClose} />
    </>
  );
}
