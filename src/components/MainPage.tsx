import { useRef, useEffect, useState, useContext } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import "src/utils/phaser";
import { config } from "src/utils/phaser";
import { GlobalContext } from "src/context/global";
import GameUtils from "./GameUtils";
import getHeatMapColors from "src/utils/getHeatMapColors";
import { ConnectModalProvider } from "src/components/WalletConnectModal";
import useUserFomopolyData from "src/hooks/useUserFomopolyData";

export const outterSharedMargin = 54;

export default function MainPage() {
  const [isHeatMapMode, setIsHeatMapMode] = useState(false);
  const hasInit = useRef(false);

  const {
    isConnectModalOpen,
    onConnectModalClose,
    selectingLandPurpose,
    setSelectingLandPurpose,
  } = useContext(GlobalContext);

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

  const onConfirmLandSelection = () => {
    if (window.fomopolyMap) {
      window.fomopolyMap;
      const selectedTileId = window.fomopolyMap.board.selectedTileId;
      console.log("selectedTileId :", selectedTileId);
    }
  };

  const shouldHideOptions = selectingLandPurpose != null;

  return (
    <ConnectModalProvider
      isOpen={isConnectModalOpen}
      onClose={onConnectModalClose}
    >
      <Box minH="100vsh" pt="75px">
        <Box id="phaser-zone-fomopoly" position="relative">
          <GameUtils
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
    </ConnectModalProvider>
  );
}
