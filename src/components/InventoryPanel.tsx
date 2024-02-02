import {
  Card,
  CardBody,
  Flex,
  SimpleGrid,
  Text,
  Image,
  TabPanel,
} from "@chakra-ui/react";
import { InventoryItem } from "./Menu";

interface InventoryPanelProps {
  items: InventoryItem[];
}

export const InventoryPanel = ({ items }: InventoryPanelProps) => {
  return (
    <TabPanel>
      <SimpleGrid columns={3} spacing="20px">
        {items.map((item) => {
          return (
            <Card key={item.name} w="100px" h="120px" border="2px" m="0px">
              <CardBody p="12px">
                <Text
                  position="absolute"
                  top="0px"
                  right="0px"
                  m="0px 4px"
                  fontSize="10px"
                  fontWeight="600"
                >
                  x {item.amount}
                </Text>
                <Flex direction="column" alignItems="center" rowGap="10px">
                  <Image src={item.image} borderRadius="lg" boxSize="52px" />
                  <Text
                    width="76px"
                    fontSize="13px"
                    lineHeight="16px"
                    fontWeight="600"
                    align="center"
                  >
                    {item.name}
                  </Text>
                </Flex>
              </CardBody>
            </Card>
          );
        })}
      </SimpleGrid>
    </TabPanel>
  );
};
