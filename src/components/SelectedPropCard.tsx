import {
  Button,
  Card,
  CardBody,
  CardProps,
  Divider,
  Flex,
  Text,
  Image,
} from "@chakra-ui/react";
import { ShopItem } from "./GameMenu";

interface SelectedPropCardProps extends CardProps {
  item: ShopItem;
  actionTitle: "Buy" | "Use";
  onClickActionItem: (item: ShopItem) => void;
}

export const SelectedPropCard = ({
  item,
  actionTitle,
  onClickActionItem,
  ...rest
}: SelectedPropCardProps) => {
  return (
    <Card
      borderRadius="unset"
      bg="gray.oliver"
      w="120px"
      h="400px"
      m="0px"
      p="0px"
      gap="16px"
      {...rest}
    >
      <CardBody p="12px">
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="start"
          rowGap="16px"
        >
          <Image src={item.image}></Image>
          <Text
            color="generic.black"
            textAlign="center"
            fontFamily="Inter"
            fontSize="16px"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="16.3px"
          >
            {item.name}
          </Text>
          <Divider borderColor="generic.black" />
          <Text
            color="generic.black"
            textAlign="center"
            fontFamily="Inter"
            fontSize="10px"
            fontStyle="normal"
            fontWeight="400"
            lineHeight="14px"
          >
            {item.desc}
          </Text>
          <Button
            p="10px 16px"
            color="generic.black"
            background="primary"
            alignSelf="stretch"
            onClick={() => {
              onClickActionItem(item);
            }}
          >
            {actionTitle}
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
};
