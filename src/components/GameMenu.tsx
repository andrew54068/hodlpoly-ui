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

export type ShopItem = {
  image: React.FunctionComponent;
  name: string;
  desc: string;
};

export type InventoryItem = ShopItem & {
  amount: number;
};

const GameMenu = ({ ...rest }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { address = "" } = useAccount();

  const { data: props } = useReadContract({
    abi: fomopolyAbi.abi,
    address: FOMOPOLY_ADDRESS_TESTNET,
    functionName: "getPlayerProps",
    args: [address],
  });

  let inventoryItems: InventoryItem[] = []
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
    ] = props.map(value => Number(value));
    const reorderedAmount = [titleDeed, highDice, lowDice, oddDice, evenDice, lotteryTicket]
    inventoryItems = shopItems.map((value, index) => {
      return {
        ...value,
        amount: reorderedAmount[index],
      };
    }).filter(value => value.amount != 0);
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
                <Tab>Leaderboard</Tab>
                <Tab>Setting</Tab>
              </TabList>
              <TabPanels>
                <ShopPanel items={shopItems} />
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
