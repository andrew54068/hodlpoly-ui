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
import { inventoryItems, shopItems } from "src/utils/constants";
import { ShopPanel } from "./ShopPanel";
import { InventoryPanel } from "./InventoryPanel";

export type ShopItem = {
  image: string;
  name: string;
  desc: string;
};

export type InventoryItem = ShopItem & {
  amount: number;
};

const Menu = ({ ...rest }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
              <TabPanels>
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


export default Menu;