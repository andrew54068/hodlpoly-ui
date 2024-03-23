import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Image,
  Flex,
  Text,
} from "@chakra-ui/react";
import { zircuitTestnet } from "src/config/chains";
import { chainSessionStorageKey } from "src/utils/constants";
import { polygonMumbai } from "viem/chains";

export const ChooseChain = () => {
  const setChain = (chain: number) => {
    sessionStorage.setItem(chainSessionStorageKey, chain.toString());
    window.location.href = "/";
  };

  return (
    <Flex
      h="80vh"
      bg="#EEF1F5"
      direction="column"
      justifyContent="center"
      alignItems="center"
      gap="50px"
    >
      <Text
        fontFamily="Inter"
        fontSize={"36px"}
        fontStyle="normal"
        fontWeight="500"
        lineHeight="35px"
        letterSpacing="-0.72px"
      >
        Select a chain to start
      </Text>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Select a Chain
        </MenuButton>
        <MenuList>
          <MenuItem
            minH="40px"
            onClick={() => {
              setChain(zircuitTestnet.id);
            }}
          >
            <Image
              boxSize="2rem"
              borderRadius="full"
              src="https://pbs.twimg.com/profile_images/1740106014459105280/i-n5YHn6_400x400.jpg"
              alt="Zircuit"
              mr="12px"
            />
            <span>Zircuit</span>
          </MenuItem>
          <MenuItem
            minH="48px"
            onClick={() => {
              setChain(polygonMumbai.id);
            }}
          >
            <Image
              boxSize="2rem"
              borderRadius="full"
              src="https://cryptologos.cc/logos/polygon-matic-logo.png?v=029"
              alt="Polygon"
              mr="12px"
            />
            <span>Polygon</span>
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
