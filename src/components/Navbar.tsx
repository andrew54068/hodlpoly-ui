import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Divider,
  Box,
  ListItem as ChakraListItem,
  Collapse,
  Flex,
  IconButton,
  List,
} from "@chakra-ui/react";
import Button from "src/components/Button";
import useClickAway from "src/hooks/useClickAway";
import { useState, useContext } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { Link } from "react-router-dom";
import formatAddress from "src/utils/formatAddress";
import {
  useMediaQuery,
  MenuButton,
  MenuItem,
  MenuList,
  Menu,
} from "@chakra-ui/react";
import LogoImg from "src/assets/FomopolyLogo.svg?react";
import { GlobalContext } from "src/context/global";
import { NAVBAR_HIGHT } from "src/utils/constants";
import { logClickConnectButton } from "src/services/Amplitude/log";

const ListItem = ({ children, ...rest }: any) => (
  <ChakraListItem
    d="flex"
    alignItems="center"
    px={4}
    py="14px"
    cursor="pointer"
    transition=".2s all"
    {...rest}
  >
    <Box mx={2} width="100%">
      {children}
    </Box>
  </ChakraListItem>
);

export default function Navbar() {
  const { onConnectModalOpen } = useContext(GlobalContext);

  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const ref = useClickAway(() => setShowDropdown(false));
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const onClickCopyAccount = () => {
    navigator.clipboard.writeText(address || "");
  };

  const onClickConnect = () => {
    logClickConnectButton();
    onConnectModalOpen();
  };

  return (
    <Flex
      ref={ref}
      top="0"
      left="0"
      h={`${NAVBAR_HIGHT}px`}
      p="space.s"
      px="space.m"
      zIndex="banner"
      position="fixed"
      width="100%"
      bg="background.primary"
      boxShadow="0 0 10px 0 rgba(0, 0, 0, 0.05)"
    >
      <Flex justify="space-between" alignItems="center" width="100%">
        <Box fontSize="size.heading.4" pl="space.l">
          <Link to="/mint">
            <LogoImg
              style={{
                width: "240px",
              }}
            />
          </Link>
        </Box>

        {isMobile ? (
          <Flex alignItems="center">
            <IconButton
              onClick={toggleDropdown}
              aria-label="menu-button"
              icon={<HamburgerIcon />}
              variant="outline"
            />
          </Flex>
        ) : (
          <Flex alignItems="center">
            <Box h="44px" mx="16px">
              <Divider orientation="vertical" bg="white" w="1px" />
            </Box>
            <Flex alignItems="center">
              {!address ? (
                <Button onClick={onClickConnect}>Connect</Button>
              ) : (
                <Box>
                  <Menu>
                    <>
                      <MenuButton>{formatAddress(address)}</MenuButton>
                      <MenuList color="#00001E">
                        <MenuItem onClick={onClickCopyAccount}>
                          {" "}
                          Copy Address{" "}
                        </MenuItem>
                        <MenuItem onClick={() => disconnect()}>
                          {" "}
                          Disconnect{" "}
                        </MenuItem>
                      </MenuList>
                    </>
                  </Menu>
                </Box>
              )}
            </Flex>
          </Flex>
        )}
      </Flex>
      {/* Dropdown menu on mobile */}
      <Collapse
        in={showDropdown}
        style={{
          position: "absolute",
          top: "75px",
          left: 0,
          width: "100%",
          zIndex: "dropdown",
          background: "white",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Box
          py="space.s"
          background="white"
          onClick={() => setShowDropdown(false)}
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.05)"
          textAlign="left"
        >
          <List fontWeight={500}>
            <ListItem>
              {!address && <Button onClick={onClickConnect}>Connect</Button>}
            </ListItem>
            <Link to="/">
              <ListItem>Main</ListItem>
            </Link>

            <ListItem onClick={onClickConnect}>
              <Flex alignItems="center" justify="space-between">
                <Box as="span">
                  {address ? `${formatAddress(address)} ` : "Connect Wallet"}
                </Box>
                {address && (
                  <Button
                    color="white"
                    onClick={onClickCopyAccount}
                    w="auto"
                    variant="outlineDark"
                  >
                    Copy Address
                  </Button>
                )}
              </Flex>
            </ListItem>

            {address && (
              <ListItem onClick={disconnect}>
                <Flex alignItems="center">
                  <Box as="span" ml="space.s">
                    Disconnect
                  </Box>
                </Flex>
              </ListItem>
            )}
          </List>
        </Box>
      </Collapse>
    </Flex>
  );
}
