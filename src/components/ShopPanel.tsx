import {
  Card,
  CardBody,
  Flex,
  SimpleGrid,
  Text,
  Image,
  TabPanel,
} from "@chakra-ui/react";
import { ShopItem } from "./GameMenu";

interface ShopPanelProps {
  items: ShopItem[];
}

export const ShopPanel = ({ items }: ShopPanelProps) => {
  return (
    <TabPanel>
      <SimpleGrid columns={3} spacing="20px">
        {items.map((item) => {
          return (
            <Card key={item.name} w="100px" h="120px" border="2px">
              <CardBody p="12px">
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
