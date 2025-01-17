import { useContext, useEffect, useState } from "react";
import { Center, Flex, SimpleGrid } from "@chakra-ui/react";
import { InventoryItem, ShopItem } from "../GameMenu";
import { PropButton } from "../Buttons/PropButton";
import { SelectedPropCard } from "../SelectedPropCard";
import useUserActions from "src/hooks/useUserActions";
import { getNumberType } from "src/utils/getNumberType";
import { PropsType, SelectingLandPurpose } from "src/types";
import MoveContext from "src/context/move";
import { GlobalContext } from "src/context/global";
import { logClickUseProps } from "src/services/Amplitude/log";
import { FMPanel } from "./FMPanel";
import { PropListSpacing, PropPanelColumnGap } from "../MainPage";

interface InventoryPanelProps {
  items: InventoryItem[];
  onDismiss: () => void;
}

export const InventoryPanel = ({ items, onDismiss }: InventoryPanelProps) => {
  const [selectedItem, setSelectedItem] = useState<ShopItem | undefined>(
    items[0]
  );
  const { rollTheDice } = useUserActions();
  const { setSelectingLandPurpose } = useContext(GlobalContext);
  const { setIsWaitingForMoving, setCurrentMoveSteps } =
    useContext(MoveContext);

  useEffect(() => {
    setSelectedItem(items[0]);
  }, [items]);

  const openPhaserSelectionMode = (purpose: SelectingLandPurpose) => {
    setSelectingLandPurpose(purpose);
    if (window.fomopolyMap) {
      window.fomopolyMap.setSelectionMode(true);
    }
  };

  const onRollingDice = async (numberType: number) => {
    try {
      setIsWaitingForMoving(true);
      onDismiss();
      const { steps = 0 } = (await rollTheDice(numberType)) || {};
      setCurrentMoveSteps(steps);
    } catch (e) {
      console.error(e);
      onDismiss();
      setIsWaitingForMoving(false);
    }
  };

  return (
    <FMPanel h="auto">
      <Flex
        minH="60px"
        alignItems="start"
        justifyContent="space-between"
        columnGap={PropPanelColumnGap.map((value) => `${value}px`)}
      >
        {items.length > 0 && (
          <SimpleGrid
            columns={3}
            spacing={PropListSpacing.map((value) => `${value}px`)}
            m="0px"
          >
            {items.map((item) => {
              return (
                <PropButton
                  key={item.name}
                  amount={item.amount}
                  item={item}
                  isSelected={item === selectedItem}
                  onClickItem={setSelectedItem}
                />
              );
            })}
          </SimpleGrid>
        )}
        {selectedItem ? (
          <SelectedPropCard
            actionTitle="Use"
            item={selectedItem}
            onClickActionItem={async (item: ShopItem) => {
              const numberType = getNumberType(item.prop);
              logClickUseProps({ numberType: numberType || 0 });
              if (numberType) {
                await onRollingDice(numberType);
              } else if (item.prop == PropsType.TitleDeed) {
                openPhaserSelectionMode(SelectingLandPurpose.LandFlipper);
              } else if (item.prop == PropsType.WorldWideTravel) {
                openPhaserSelectionMode(SelectingLandPurpose.WorldWideTravel);
              }

              onDismiss();
            }}
          />
        ) : (
          <Center color="primary" m="auto">
            You don't have any props yet!
          </Center>
        )}
      </Flex>
    </FMPanel>
  );
};
