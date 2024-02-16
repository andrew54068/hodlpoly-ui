import { Flex, SimpleGrid, TabPanel } from "@chakra-ui/react";
import { ShopItem } from "./GameMenu";
import { useState } from "react";
import { PropButton } from "./PropButton";
import { SelectedPropCard } from "./SelectedPropCard";

interface ShopPanelProps {
  items: ShopItem[];
}

export const ShopPanel = ({ items }: ShopPanelProps) => {
  const [selectedItem, setSelectedItem] = useState(items[0]);

  return (
    <TabPanel p="24px">
      <Flex alignItems="start" justifyContent="space-between" columnGap="24px">
        <SimpleGrid columns={3} spacing="20px" m="0px">
          {items.map((item) => {
            return <PropButton key={item.name} item={item} onClickItem={setSelectedItem} />;
          })}
        </SimpleGrid>
        <SelectedPropCard item={selectedItem} />
      </Flex>
    </TabPanel>
  );
};
