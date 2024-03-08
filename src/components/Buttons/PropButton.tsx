import {
  Card,
  CardBody,
  Flex,
  Text,
  Image,
  ResponsiveValue,
  CardProps,
} from "@chakra-ui/react";
import { ShopItem } from "../GameMenu";
import { PropImageSize, PropTitleSize, PropTitleWidth } from "../MainPage";

const normalButtonStyle: {
  p: string;
  w: string | string[];
  h: string | string[];
  border: string;
  flexDirection: ResponsiveValue<any>;
  justifyContent: string;
  alignItems: string;
  flexShrink: number;
  background: string;
  color: string;
  borderRadius: string;
} = {
  p: "12px",
  w: ["70px", "90px", "100px"],
  h: ["95px", "110px", "120px"],
  border: "2px solid #9EA889",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  flexShrink: 0,
  background: "none",
  color: "gray.oliver",
  borderRadius: "0px",
};

const hoverButtonStyle = {
  border: "2px solid #FCFC54",
  color: "primary",
};

const activeButtonStyle = {
  border: "2px solid #FFF",
  color: "primary",
};

interface PropButtonProps extends CardProps {
  item: ShopItem;
  amount?: number;
  onClickItem: (item: ShopItem) => void;
}

export const PropButton = ({ item, onClickItem, ...rest }: PropButtonProps) => {
  return (
    <Card
      key={item.name}
      {...normalButtonStyle}
      {...rest}
      _hover={hoverButtonStyle}
      _active={activeButtonStyle}
      onClick={() => {
        onClickItem(item);
      }}
    >
      <CardBody p="0px">
        {!!rest.amount && rest.amount > 1 && (
          <Text
            position="absolute"
            right="5px"
            top="0px"
            color="gray.oliver"
            textAlign="center"
            fontFamily="Inter"
            fontSize={["8px", "10px"]}
            fontStyle="normal"
            fontWeight="600"
            lineHeight="20px"
            textTransform="lowercase"
          >
            x {rest.amount}
          </Text>
        )}
        <Flex direction="column" alignItems="center" rowGap={["5px", "10px"]}>
          <Image
            boxSize={PropImageSize.map((value) => `${value}px`)}
            src={item.image}
          ></Image>
          <Text
            width={PropTitleWidth.map((value) => `${value}px`)}
            fontSize={PropTitleSize.map((value) => `${value}px`)}
            lineHeight={["13px", "16px"]}
            fontWeight="600"
            align="center"
            whiteSpace="normal"
          >
            {item.name}
          </Text>
        </Flex>
      </CardBody>
    </Card>
  );
};
