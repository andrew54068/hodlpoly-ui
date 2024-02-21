import {
  Button,
  ButtonProps,
  Card,
  CardBody,
  Flex,
  Text,
  Image,
} from "@chakra-ui/react";
import { ShopItem } from "./GameMenu";

interface PropButtonProps extends ButtonProps {
  item: ShopItem;
  amount?: number;
  onClickItem: (item: ShopItem) => void;
}

export const PropButton = ({
  item,
  onClickItem,
  ...rest
}: PropButtonProps) => {
  return (
    <Button
      {...rest}
      bg="none"
      m="0px"
      p="0px"
      w="100px"
      h="120px"
      onClick={() => {
        onClickItem(item);
      }}
    >
      <Card
        key={item.name}
        alignSelf="stretch"
        border="2px"
        borderRadius="unset"
        m="0px"
        p="0px"
      >
        <CardBody p="12px">
          {!!rest.amount && rest.amount > 1 && (
            <Text
              position="absolute"
              top="0px"
              right="0px"
              m="0px 4px"
              fontSize="10px"
              fontWeight="600"
            >
              x {rest.amount}
            </Text>
          )}
          <Flex direction="column" alignItems="center" rowGap="10px">
            <Image src={item.image}></Image>
            <Text
              width="76px"
              fontSize="13px"
              lineHeight="16px"
              fontWeight="600"
              align="center"
              whiteSpace="normal"
            >
              {item.name}
            </Text>
          </Flex>
        </CardBody>
      </Card>
    </Button>
  );
};
