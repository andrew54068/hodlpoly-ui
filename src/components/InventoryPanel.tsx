import { useContext, useState } from "react";
import { Center, Flex, SimpleGrid, TabPanel } from "@chakra-ui/react";
import { InventoryItem, ShopItem } from "./GameMenu";
import { PropButton } from "./PropButton";
import { SelectedPropCard } from "./SelectedPropCard";
import useUserActions from "src/hooks/useUserActions";
import { getNumberType } from "src/utils/getNumberType";
import { PropsType, SelectingLandPurpose } from "src/types";
import { GlobalContext } from "src/context/global";
import { logClickUseProps } from "src/services/Amplitude/log";

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

  return (
    <TabPanel p="24px" bg="#FFFFFF" h="448px">
      <Flex alignItems="start" justifyContent="space-between" columnGap="24px">
        <SimpleGrid columns={3} spacing="20px" m="0px">
          {items.map((item) => {
            return (
              <PropButton
                key={item.name}
                amount={item.amount}
                item={item}
                onClickItem={setSelectedItem}
              />
            );
          })}
        </SimpleGrid>
        {selectedItem ? (
          <SelectedPropCard
            actionTitle="Use"
            item={selectedItem}
            onClickActionItem={(item: ShopItem) => {
              const numberType = getNumberType(item.prop);
              logClickUseProps({ numberType: numberType || 0 });
              if (numberType) {
                rollTheDice(numberType);
              } else if (item.prop == PropsType.TitleDeed) {
                console.log(`here`);
                setSelectingLandPurpose(SelectingLandPurpose.ProtectLand);
              } else if (item.prop == PropsType.WorldWideTravel) {
                console.log(`here2`);
                setSelectingLandPurpose(SelectingLandPurpose.WorldWideTravel);
              }

              onDismiss();
            }}
          />
        ) : (
          <Center display="block" position="absolute">
            You don't have any props yet!
          </Center>
        )}
      </Flex>
    </TabPanel>
  );
};
