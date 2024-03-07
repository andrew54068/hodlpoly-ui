import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  useDisclosure,
  Image,
  Stack,
  Box,
} from "@chakra-ui/react";
import { shopItems } from "src/utils/constants";
import { ShopPanel } from "./ShopPanel";
import { InventoryPanel } from "./InventoryPanel";
import useUserFomopolyData from "src/hooks/useUserFomopolyData";
import { useReducer, useState } from "react";
import { SettingPanel } from "./SettingPanel";
import store from "src/assets/store.svg";
import inventory from "src/assets/inventory.svg";
import setting from "src/assets/setting.svg";
import guide from "src/assets/guide.svg";
import { PropsType } from "src/types";
import { GuidePanel } from "./Guide";

export type ShopItem = {
  image: string;
  name: string;
  desc: string;
  prop: PropsType;
};

export type InventoryItem = ShopItem & {
  amount: number;
};

const normalTabTextStyle = {
  color: "#C0C0C0",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
};

const focuseTabTextStyle = {
  bg: "#FFFFFF",
  color: "#000000",
  fontSize: "18px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "normal",
};

const buttonStyle = {
  width: "60px",
  height: "60px",
  p: "0px",
  bg: "none",
  _hover: {},
  _active: {
    bg: "none",
    transform: "scale(0.98)",
  },
};

const GameMenu = ({ ...rest }: any) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { userProps, refetchUserProps } = useUserFomopolyData();

  let inventoryItems: InventoryItem[] = [];
  if (userProps) {
    console.log(typeof userProps);

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
      highDice,
      lowDice,
      oddDice,
      evenDice,
      lotteryTicket,
      worldWideTravel,
    ];
    inventoryItems = shopItems
      .map((value, index) => {
        return {
          ...value,
          amount: reorderedAmount[index],
        };
      })
      .filter((value) => value.amount != 0);
  }

  const onTabChange = () => {
    refetchUserProps();
  };
  return (
    <Box {...rest}>
      <Stack justify="space-between" direction="column" align="center">
        <Button
          {...buttonStyle}
          onClick={() => {
            setSelectedIndex(0);
            onOpen();
          }}
        >
          <Image src={store}></Image>
        </Button>
        <Button
          {...buttonStyle}
          onClick={() => {
            setSelectedIndex(1);
            onOpen();
          }}
        >
          <Image src={inventory}></Image>
        </Button>
        <Button
          {...buttonStyle}
          onClick={() => {
            setSelectedIndex(2);
            onOpen();
          }}
        >
          <Image src={setting}></Image>
        </Button>
        <Button
          {...buttonStyle}
          onClick={() => {
            setSelectedIndex(3);
            onOpen();
          }}
        >
          <Image src={guide}></Image>
        </Button>
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          width="564px"
          height="auto"
          p="16px"
          maxW="564px"
          borderRadius="0px"
          bg="linear-gradient(270deg, #FFF -26.8%, #000 30.45%)"
        >
          <ModalBody m="0px" p="0px" bg="none">
            <Tabs
              defaultIndex={selectedIndex}
              variant="enclosed"
              onChange={onTabChange}
            >
              <TabList color="#C0C0C0">
                <Tab
                  isFocusable
                  borderRadius="0px"
                  {...normalTabTextStyle}
                  _focus={focuseTabTextStyle}
                  _selected={focuseTabTextStyle}
                >
                  Shop
                </Tab>
                <Tab
                  isFocusable
                  borderRadius="0px"
                  {...normalTabTextStyle}
                  _focus={focuseTabTextStyle}
                  _selected={focuseTabTextStyle}
                >
                  Inventory
                </Tab>
                <Tab
                  isFocusable
                  borderRadius="0px"
                  {...normalTabTextStyle}
                  _focus={focuseTabTextStyle}
                  _selected={focuseTabTextStyle}
                >
                  Setting
                </Tab>
                <Tab
                  isFocusable
                  borderRadius="0px"
                  {...normalTabTextStyle}
                  _focus={focuseTabTextStyle}
                  _selected={focuseTabTextStyle}
                >
                  Guide
                </Tab>
              </TabList>
              <TabPanels>
                <ShopPanel
                  items={shopItems}
                  onUpdateAmount={() => {
                    forceUpdate();
                  }}
                />
                <InventoryPanel items={inventoryItems} onDismiss={onClose} />
                <SettingPanel />
                <GuidePanel />
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
