import {
  Flex,
  Text,
  Image,
  Button,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  useDisclosure,
  ModalHeader,
  Box,
} from "@chakra-ui/react";
import useUserFomopolyData from "src/hooks/useUserFomopolyData";
import avatar from "src/assets/avatar.svg";
import { formatEther } from "viem";
import { useAccount, useEnsName } from "wagmi";
import { mainnet } from "wagmi/chains";
import { FillButton } from "./Buttons/FillButton";

const ProfileImageAndName = () => {
  const { address = "0x" } = useAccount();
  const result = useEnsName({
    address,
    chainId: mainnet.id,
  });

  const displayContent = result.data || address;

  return (
    <Flex justifyContent="space-between" alignItems="center" columnGap="24px">
      <Box
        flexShrink={0}
        width="76px"
        height="76px"
        padding="12.667px"
        justifyContent="center"
        alignItems="center"
        bg="primary"
        borderRadius="316.667px"
      >
        <Image boxSize="50px" src={avatar}></Image>
      </Box>
      <Box>
        <Text
          fontSize="24px"
          fontStyle="normal"
          fontWeight="600"
          lineHeight="24px"
          wordBreak="break-word"
          color="gray.oliver"
        >
          {displayContent == "" ? "Wallet Not Connected" : displayContent}
        </Text>
      </Box>
    </Flex>
  );
};

interface BalanceCardProps {
  balance: bigint;
  symbol: string;
}

const BalanceCard = ({ balance, symbol }: BalanceCardProps) => {
  return (
    <Flex
      direction="column"
      rowGap="24px"
      p="20px"
      bg="none"
      borderColor="gray.oliver"
      borderWidth="2px"
    >
      <Flex direction="column" rowGap="16px" alignItems="start">
        <Text
          color="gray.oliver"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="400"
          lineHeight="16.3px"
        >
          Balance
        </Text>
        <Text
          color="primary"
          textAlign="center"
          fontSize="24px"
          fontStyle="normal"
          fontWeight="500"
          lineHeight="16.3px"
        >
          {formatEther(balance)} {symbol}
        </Text>
      </Flex>
      <Flex columnGap="24px">
        <FillButton>Deposit</FillButton>
      </Flex>
    </Flex>
  );
};

export const UserProfile = ({ ...rest }: any) => {
  const { userBalance, fmpBalance } = useUserFomopolyData();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Button
        width="96px"
        height="96px"
        bg="none"
        borderRadius="400px"
        background="primary"
        {...rest}
        _hover={{
          background: "#FFFF7B",
          boxShadow: "0px 0px 19px 0px #FCFC54",
        }}
        _active={{
          background: "primary",
          boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.40) inset",
        }}
        onClick={onOpen}
      >
        <Image boxSize="64px" src={avatar}></Image>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          width="564px"
          height="auto"
          p="16px"
          maxW="564px"
          borderRadius="0px"
          bg="gray.oliver.dark"
        >
          <ModalHeader>
            <ModalCloseButton color="white" m="0px 10px" />
          </ModalHeader>
          <ModalBody m="0px" p="0px" bg="none">
            <Flex
              direction="column"
              justifyContent="center"
              alignItems="stretch"
              rowGap="24px"
              bg="background.dark"
              p="24px"
            >
              <ProfileImageAndName />
              <BalanceCard balance={userBalance} symbol="ETH" />
              <BalanceCard balance={fmpBalance} symbol="FMP" />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
