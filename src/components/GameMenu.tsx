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
import { useAccount, useReadContract } from "wagmi";
import { shopItems } from "src/utils/constants";
import { ShopPanel } from "./ShopPanel";
import { InventoryPanel } from "./InventoryPanel";
import fomopolyAbi from "src/abi/fomopoly";
import { FOMOPOLY_PROXY_ADDRESS } from "src/constants";
import { useReducer, useState } from "react";
import { SettingPanel } from "./SettingPanel";
import store from "src/assets/store.png";
import inventory from "src/assets/inventory.png";
import setting from "src/assets/setting.png";

export enum Props {
  OddDice = 0,
  EvenDice = 1,
  LowDice = 2,
  HighDice = 3,
  TitleDeed = 4,
  Ticket = 5, // 10 tickets for 1 lottery ticket
  LotteryTicket = 6,
}

export type ShopItem = {
  image: string;
  name: string;
  desc: string;
  prop: Props;
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
  bg: "clear",
  _hover: {},
  _active: {
    bg: "clear",
    transform: "scale(0.98)",
  },
};

const GameMenu = ({ ...rest }: any) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { address = "" } = useAccount();

  const { data: props } = useReadContract({
    abi: fomopolyAbi.abi,
    address: FOMOPOLY_PROXY_ADDRESS,
    functionName: "getPlayerProps",
    args: [address],
  });

  let inventoryItems: InventoryItem[] = [];
  if (props) {
    console.log(typeof props);
    const [oddDice, evenDice, lowDice, highDice, titleDeed, , lotteryTicket] =
      props.map((value) => Number(value));
    const reorderedAmount = [
      titleDeed,
      highDice,
      lowDice,
      oddDice,
      evenDice,
      lotteryTicket,
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
          <ModalBody m="0px" p="0px" bg="clear">
            <Tabs defaultIndex={selectedIndex} variant="enclosed">
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
              </TabList>
              <TabPanels>
                <ShopPanel
                  items={shopItems}
                  onUpdateAmount={() => {
                    forceUpdate();
                  }}
                />
                <InventoryPanel items={inventoryItems} />
                <SettingPanel />
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
