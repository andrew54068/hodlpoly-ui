import { useState } from "react";
import { Center, Text, Flex, SimpleGrid, TabPanel } from "@chakra-ui/react";
import { InventoryItem, ShopItem } from "./GameMenu";
import { PropButton } from "./PropButton";
import { SelectedPropCard } from "./SelectedPropCard";

interface InventoryPanelProps {
  items: InventoryItem[];
}

export const InventoryPanel = ({ items }: InventoryPanelProps) => {
  const [selectedItem, setSelectedItem] = useState<ShopItem | undefined>(
    items[0]
  );

  return (
    <TabPanel p="24px">
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
            onClickActionItem={() => {}}
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
