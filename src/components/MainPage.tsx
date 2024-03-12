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
import useSoundEffect from "src/hooks/useSoundEffect";

export const outterSharedMargin = [20, 35, 54];
export const GoButtonSize = [100, 120, 146];
export const GameMenuTopMargin = [100, 140, 156];
export const MenuButtonSize = [52, 56, 60];
export const PropImageSize = [28, 30, 52];
export const PropTitleSize = [10, 13];
export const PropTitleWidth = [50, 65, 76];
export const PropListSpacing = [15, 18, 24];
export const PropPanelPadding = [12, 18, 24];
export const PropPanelColumnGap = [15, 18, 24];
export const TopBarHeight = [60, 90];

export default function MainPage() {
  const { worldWideTravel, flipLandPrice } = useUserActions();
  const { loopPlayBackgroundMusic } = useSoundEffect();
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
    loopPlayBackgroundMusic();
  }, [loopPlayBackgroundMusic]);

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
      // workaround for the race condition of the phaser map not ready
      setTimeout(() => {
        window.fomopolyMap.setUserPositionBySteps(userSteps);
      }, 1000);
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
      } else if (selectingLandPurpose === SelectingLandPurpose.LandFlipper) {
        await flipLandPrice(selectedTileId);
      }

      window.fomopolyMap.closeSelectionMode();
      setSelectingLandPurpose(null);
    }
  };

  const shouldHideOptions = selectingLandPurpose != null;

  return (
    <>
      <Box minH="100vh">
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
          bottom={outterSharedMargin.map((value) => `${value}px`)}
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
