import {
  Button,
  Container,
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
} from "@chakra-ui/react";
import { useAccount, useReadContract } from "wagmi";
import { shopItems } from "src/utils/constants";
import { ShopPanel } from "./ShopPanel";
import { InventoryPanel } from "./InventoryPanel";
import fomopolyAbi from "src/abi/fomopoly";
import { FOMOPOLY_ADDRESS_TESTNET } from "src/constants";
import { useReducer, useState } from "react";

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
  image: React.FunctionComponent;
  name: string;
  desc: string;
  prop: Props;
};

export type InventoryItem = ShopItem & {
  amount: number;
};

const GameMenu = ({ ...rest }: any) => {
  // const [key, setKey] = useState(0);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { address = "" } = useAccount();

  const { data: props } = useReadContract({
    abi: fomopolyAbi.abi,
    address: FOMOPOLY_ADDRESS_TESTNET,
    functionName: "getPlayerProps",
    args: [address],
  });

  let inventoryItems: InventoryItem[] = [];
  if (props) {
    console.log(typeof props);
    const [
      oddDice,
      evenDice,
      lowDice,
      highDice,
      titleDeed,
      ticket,
      lotteryTicket,
    ] = props.map((value) => Number(value));
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
    <Container {...rest}>
      <Button onClick={onOpen}>Marketplace</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width="564px" height="531px" p="16px" maxW="564px">
          <ModalCloseButton
            position="absolute"
            top="10px"
            right="0px"
            m="10px"
          />
          <ModalBody m="0px" p="0px">
            <Tabs variant="enclosed">
              <TabList>
                <Tab>Shop</Tab>
                <Tab>Inventory</Tab>
                <Tab>Setting</Tab>
              </TabList>
              <TabPanels>
                <ShopPanel
                  items={shopItems}
                  onUpdateAmount={() => {
                    forceUpdate();
                  }}
                />
                <InventoryPanel items={inventoryItems} />
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default GameMenu;
