import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  TabList,
  TabPanels,
  Tabs,
  useDisclosure,
  Stack,
  Box,
  Link,
} from "@chakra-ui/react";
import { useEffect, useReducer, useState } from "react";

import useUserFomopolyData from "src/hooks/useUserFomopolyData";
import { shopItems } from "src/utils/constants";
import { FMTab } from "./FMTab";
import { MenuButton } from "./Buttons/MenuButton";
import { PropsType } from "src/types";
import useCheckLogin from "src/hooks/useCheckLogin";

import { ShopPanel } from "./Panels/ShopPanel";
import { InventoryPanel } from "./Panels/InventoryPanel";
import { SettingPanel } from "./Panels/SettingPanel";

import store from "/store.svg";
import storeHover from "/store-hover.svg";
import storeActive from "/store-active.svg";

import inventory from "/inventory.svg";
import inventoryHover from "/inventory-hover.svg";
import inventoryActive from "/inventory-active.svg";

import setting from "/setting.svg";
import settingHover from "/setting-hover.svg";
import settingActive from "/setting-active.svg";

import guide from "/guide.svg";
import guideHover from "/guide-hover.svg";
import guideActive from "/guide-active.svg";

export type ShopItem = {
  image: string;
  name: string;
  desc: string;
  prop: PropsType;
};

export type InventoryItem = ShopItem & {
  amount: number;
};

enum TabIndex {
  SHOP = 0,
  INVENTORY = 1,
  SETTING = 2,
  GUIDE = 3,
}

const generateInventoryItems = (
  userProps: bigint[] | undefined
): InventoryItem[] => {
  if (!userProps) return [];
  const [
    oddDice,
    evenDice,
    lowDice,
    highDice,
    titleDeed,
    ,
    lotteryTicket,
    worldWideTravel,
  ] = userProps.map((value) => Number(value));
  const reorderedAmount = [
    titleDeed,
    lotteryTicket,
    worldWideTravel,
    highDice,
    lowDice,
    oddDice,
    evenDice,
  ];

  return shopItems
    .map((value, index) => {
      return {
        ...value,
        amount: reorderedAmount[index],
      };
    })
    .filter((value) => value.amount != 0);
};

const GameMenu = ({ ...rest }: any) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const checkUserLogin = useCheckLogin();

  const { userProps, refetchUserProps } = useUserFomopolyData();
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(
    generateInventoryItems(userProps)
  );

  const onTabChange = async () => {
    const result = await refetchUserProps();
    const newInventoryItems = generateInventoryItems(result.data);
    console.log("newInventoryItems :", newInventoryItems);
    setInventoryItems(newInventoryItems);
  };

  useEffect(() => {
    onTabChange()
  }, []);

  return (
    <Box {...rest}>
      <Stack justify="space-between" direction="column" align="center">
        <MenuButton
          normalImage={store}
          hoverImage={storeHover}
          activeImage={storeActive}
          onClick={() => {
            if (!checkUserLogin()) return;
            setSelectedIndex(TabIndex.SHOP);
            onOpen();
          }}
        />
        <MenuButton
          normalImage={inventory}
          hoverImage={inventoryHover}
          activeImage={inventoryActive}
          onClick={() => {
            if (!checkUserLogin()) return;
            setSelectedIndex(TabIndex.INVENTORY);
            onOpen();
          }}
        />
        <MenuButton
          normalImage={setting}
          hoverImage={settingHover}
          activeImage={settingActive}
          onClick={() => {
            if (!checkUserLogin()) return;
            setSelectedIndex(TabIndex.SETTING);
            onOpen();
          }}
        />
        <MenuButton
          normalImage={guide}
          hoverImage={guideHover}
          activeImage={guideActive}
        >
          <Link
            href="https://freeflow.gitbook.io/freeflow/projects/fomopoly/game-mechanism"
            target="_blank"
            width="100%"
            height="100%"
            isExternal
          />
        </MenuButton>
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          width="564px"
          height="auto"
          p="16px"
          maxW="564px"
          borderRadius="0px"
          bg="gray.oliver.dark"
        >
          <ModalBody m="0px" p="0px" bg="none">
            <Tabs
              defaultIndex={selectedIndex}
              variant="enclosed"
              onChange={onTabChange}
            >
              <TabList>
                <FMTab>Shop</FMTab>
                <FMTab>Inventory</FMTab>
                <FMTab>Setting</FMTab>
              </TabList>
              <TabPanels>
                <ShopPanel
                  items={shopItems}
                  onUpdateAmount={() => {
                    forceUpdate();
                  }}
                />
                <InventoryPanel items={inventoryItems} onDismiss={onClose} />
                <SettingPanel onClose={onClose} />
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalCloseButton
            color="white"
            position="absolute"
            top="10px"
            right="0px"
            m="10px"
          />
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default GameMenu;
