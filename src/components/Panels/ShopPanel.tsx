import { Flex, SimpleGrid } from "@chakra-ui/react";
import { ShopItem } from "../GameMenu";
import { useState } from "react";
import { PropButton } from "../Buttons/PropButton";
import { SelectedPropCard } from "../SelectedPropCard";
import useUserAction from "src/hooks/useUserActions";
import { logClickBuyProps } from "src/services/Amplitude/log";
import { FMPanel } from "./FMPanel";
import { PropPanelColumnGap } from "../MainPage";

interface ShopPanelProps {
  items: ShopItem[];
  onUpdateAmount: () => void;
}

export const ShopPanel = ({ items, onUpdateAmount }: ShopPanelProps) => {
  const [selectedItem, setSelectedItem] = useState<ShopItem>(items[0]);
  const { buyProp } = useUserAction();

  const onClickBuyProp = async (item: ShopItem) => {
    const hash = await buyProp(item.prop);
    console.log("hash of buy props:", hash);
    logClickBuyProps();
    onUpdateAmount();
  };

  return (
    <FMPanel>
      <Flex
        alignItems="start"
        justifyContent="space-between"
        columnGap={PropPanelColumnGap.map((value) => `${value}px`)}
      >
        <SimpleGrid columns={3} spacing="20px" m="0px">
          {items.map((item) => {
            return (
              <PropButton
                key={item.name}
                item={item}
                isSelected={selectedItem === item}
                onClickItem={setSelectedItem}
              />
            );
          })}
        </SimpleGrid>
        <SelectedPropCard
          item={selectedItem}
          actionTitle="Buy"
          onClickActionItem={onClickBuyProp}
        />
      </Flex>
    </FMPanel>
  );
};
