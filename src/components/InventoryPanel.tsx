import { useState } from "react";
import { Flex, SimpleGrid, TabPanel } from "@chakra-ui/react";
import { InventoryItem, ShopItem } from "./GameMenu";
import { PropButton } from "./PropButton";
import { SelectedPropCard } from "./SelectedPropCard";

interface InventoryPanelProps {
  items: InventoryItem[];
}

export const InventoryPanel = ({ items }: InventoryPanelProps) => {
  const [selectedItem, setSelectedItem] = useState<ShopItem>(items[0]);

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
        <SelectedPropCard item={selectedItem} />
      </Flex>
    </TabPanel>
  );
};
