import {
  Button,
  Card,
  CardBody,
  CardProps,
  Divider,
  Flex,
  Text,
} from "@chakra-ui/react";
import { ShopItem } from "./GameMenu";

interface SelectedPropCardProps extends CardProps {
  item: ShopItem;
}

export const SelectedPropCard = ({ item, ...rest }: SelectedPropCardProps) => {
  return (
    <Card
      border="2px"
      borderRadius="unset"
      bg="#E5E7EB"
      w="120px"
      h="400px"
      m="0px"
      p="0px"
      {...rest}
    >
      <CardBody p="12px">
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="start"
          rowGap="10px"
        >
          <item.image />
          <Text
            width="76px"
            fontSize="13px"
            lineHeight="16px"
            fontWeight="600"
            align="center"
          >
            {item.name}
          </Text>
          <Divider />
          <Text>{item.desc}</Text>
          <Button
            p="16px 10px"
            color="#FFFFFF"
            background="linear-gradient(270deg, #FFF -26.8%, #000 30.45%)"
          >
            Buy
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
};
