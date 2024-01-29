import { HamburgerIcon } from "@chakra-ui/icons";
import { Divider, Box, ListItem as ChakraListItem, Collapse, Flex, IconButton, List } from "@chakra-ui/react";
import Button from "src/components/Button";
import useClickAway from "src/hooks/useClickAway";
import { useState } from "react";
import { Link } from "react-router-dom";
import formatAddress from "src/utils/formatAddress";
import { useEffect, useContext } from "react";
import { useMediaQuery, MenuButton, MenuItem, MenuList, Menu } from "@chakra-ui/react";
import { GlobalContext } from "src/context/global";
import LogoImg from "src/assets/react.svg?react";

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
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { account, setAccount } = useContext(GlobalContext)

  const disconnect = () => {
  };

  useEffect(
    () => {
      return () => { }
    },
    [setAccount]
  );


  const ref = useClickAway(() => setShowDropdown(false));
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const onClickCopyAccount = () => {
    navigator.clipboard.writeText(account || "");
  };

  const onClickConnect = async () => {
  };

  return (
    <Flex
      ref={ref}
      top="0"
      left="0"
      h="75px"
      p="space.s"
      zIndex="banner"
      position="fixed"
      width="100%"
      bg="background.primary"
      boxShadow="0 0 10px 0 rgba(0, 0, 0, 0.05)"
    >
      <Flex justify="space-between" alignItems="center" width="100%">
        <Box fontSize="size.heading.4" pl="space.l" >
          <Link to="/mint">
            <LogoImg />
          </Link>
        </Box>


        {
          isMobile ? <Flex alignItems="center">
            <IconButton onClick={toggleDropdown} aria-label="menu-button" icon={<HamburgerIcon />} variant="outline" />
          </Flex> : <Flex alignItems="center">


            <Box h="44px" mx="32px">
              <Divider orientation='vertical' bg="white" w="1px" />
            </Box>
            <Box>
              {
                !account ? <Button onClick={onClickConnect} >
                  Connect Wallet
                </Button> : <Box>

                  <Menu>
                    <>
                      <MenuButton>
                        {formatAddress(account)}
                      </MenuButton>
                      <MenuList color="#00001E" onClick={disconnect}>
                        <MenuItem> Disconnect</MenuItem>
                      </MenuList>
                    </>
                  </Menu>
                </Box>
              }
            </Box>
          </Flex>
        }
      </Flex>
      {/* Dropdown menu on mobile */}
      <Collapse
        in={showDropdown}
        style={{
          position: "absolute",
          top: "75px",
          left: 0,
          width: "100%",
          zIndex: 1400,
          background: "white",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Box
          py="space.s"
          zIndex="overlay"
          background="white"
          onClick={() => setShowDropdown(false)}
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.05)"
          textAlign="left"
        >
          <List fontWeight={500}>

            <Link to="/">
              <ListItem>
                Main
              </ListItem>
            </Link>

            <ListItem onClick={onClickConnect}>
              <Flex alignItems="center" justify="space-between">
                <Box as="span">
                  {account ? `${formatAddress(account)} ` : "Connect Wallet"}
                </Box>
                {account && (
                  <Button color="white" onClick={onClickCopyAccount} w="auto" variant="outlineDark" >
                    Copy Address
                  </Button>
                )}
              </Flex>
            </ListItem>

            {account && (
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
    </Flex >
  );
}
