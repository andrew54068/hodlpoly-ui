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
import { inventoryItems, shopItems } from "src/utils/constants";
import { ShopPanel } from "./ShopPanel";
import { InventoryPanel } from "./InventoryPanel";
import fomopolyAbi from 'src/abi/fomopoly'
import { FOMOPOLY_ADDRESS_TESTNET } from "src/constants";

export type ShopItem = {
  image: string;
  name: string;
  desc: string;
};

export type InventoryItem = ShopItem & {
  amount: number;
};

const GameMenu = ({ ...rest }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { address = '' } = useAccount()

  const { data: props } = useReadContract({
    abi: fomopolyAbi.abi,
    address: FOMOPOLY_ADDRESS_TESTNET,
    functionName: 'getPlayerProps',
    args: [address]
  })

  console.log(`💥 props: ${JSON.stringify(props, null, '  ')}`);

  return (
    <Container {...rest}>
      <Button onClick={onOpen}>Marketplace</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width="auto" maxW="auto">
          <ModalCloseButton
            position="absolute"
            top="10px"
            right="0px"
            m="10px"
          />
          <ModalBody m="10px">
            <Tabs variant="enclosed">
              <TabList>
                <Tab>Shop</Tab>
                <Tab>Inventory</Tab>
                <Tab>Leaderboard</Tab>
                <Tab>Setting</Tab>
              </TabList>
              <TabPanels width="80%">
                <ShopPanel items={shopItems} />
                <InventoryPanel items={inventoryItems} />
              </TabPanels>
            </Tabs>
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </Container>
  );
};


export default GameMenu;