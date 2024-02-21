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
import avatar from "src/assets/avatar.png";
import avatarSmall from "src/assets/avatar-small.png";
import { formatEther } from "viem";
import { useAccount, useEnsName } from "wagmi";
import { mainnet } from "wagmi/chains";

const normalDepositButtonStyle = {
  color: "white",
  padding: "10px",
  width: "100%",
  hight: "100%",
  borderRadius: "8px",
  background: "linear-gradient(270deg, #FFF -26.8%, #000 30.45%)",
  boxShadow: "0px 2px 6px 0px rgba(16, 24, 40, 0.06)",
};

const hoverDepositButtonStyle = {
  borderRadius: "8px",
  background: "linear-gradient(270deg, #FFF -26.8%, #000 30.45%)",
  boxShadow: "0px 0px 9px 0px #504D4D",
};

const pressDepositButtonStyle = {
  borderRadius: "8px",
  background: "linear-gradient(270deg, #FFF -26.8%, #000 30.45%)",
  boxShadow:
    "0px 2px 6px 0px rgba(16, 24, 40, 0.06), -3px 1px 0px 0px rgba(0, 0, 0, 0.40) inset",
};

const activeDepositButtonStyle = {
  borderRadius: "8px",
  background: "linear-gradient(270deg, #FFF -26.8%, #000 30.45%)",
  boxShadow:
    "0px 2px 6px 0px rgba(16, 24, 40, 0.06), -3px 1px 0px 0px rgba(0, 0, 0, 0.40) inset",
};

const ProfileImageAndName = () => {
  const { address = "0x" } = useAccount();
  const result = useEnsName({
    address,
    chainId: mainnet.id,
  });

  const displayContent = result.data || address;

  return (
    <Flex
      justifyContent="start"
      alignItems="center"
      bg="white"
      columnGap="24px"
    >
      <Image src={avatarSmall}></Image>
      <Text
        fontSize="24px"
        fontStyle="normal"
        fontWeight="600"
        lineHeight="24px"
        wordBreak="break-word"
      >
        {displayContent == "" ? "Wallet Not Connected" : displayContent}
      </Text>
    </Flex>
  );
};

interface BalanceCardProps {
  balance: bigint;
  symbol: string;
}

const BalanceCard = ({ balance, symbol }: BalanceCardProps) => {
  return (
    <Flex direction="column" rowGap="24px" p="20px" bg="#E5E7EB">
      <Flex direction="column" rowGap="16px" alignItems="start">
        <Text
          color="var(--Neutral-600, #4B5563)"
          fontSize="16px"
          fontStyle="normal"
          fontWeight="400"
          lineHeight="16.3px"
        >
          Balance
        </Text>
        <Text
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
        <Button
          {...normalDepositButtonStyle}
          _hover={hoverDepositButtonStyle}
          _pressed={pressDepositButtonStyle}
          _active={activeDepositButtonStyle}
        >
          Deposit
        </Button>
      </Flex>
    </Flex>
  );
};

export const UserProfile = ({ ...rest }: any) => {
  const { userBalance, fmpBalance } = useUserFomopolyData();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box {...rest}>
      <Button
        size="96px"
        bg="none"
        _hover={{}}
        _active={{ bg: "none", transform: "scale(0.98)" }}
        onClick={onOpen}
      >
        <Image src={avatar}></Image>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          width="564px"
          height="auto"
          p="16px"
          maxW="564px"
          borderRadius="0px"
          bg="linear-gradient(270deg, #FFF -26.8%, #000 30.45%)"
        >
          <ModalHeader>
            <ModalCloseButton color="white" m="10px" />
          </ModalHeader>
          <ModalBody m="0px" p="0px" bg="none">
            <Flex
              direction="column"
              justifyContent="center"
              alignItems="stretch"
              rowGap="24px"
              bg="white"
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
