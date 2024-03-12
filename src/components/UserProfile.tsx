import {
  Flex,
  Text,
  Image,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  useDisclosure,
  ModalHeader,
  Box,
  Center,
} from "@chakra-ui/react";
import useUserFomopolyData from "src/hooks/useUserFomopolyData";
import avatarSmall from "src/assets/avatar-profile-small.svg";
import avatar from "src/assets/avatar-profile.svg";
import { formatEther } from "viem";
import { useAccount, useEnsName } from "wagmi";
import { mainnet } from "wagmi/chains";
import { FillButton } from "./Buttons/FillButton";
import useCheckLogin from "src/hooks/useCheckLogin";
import { TopBarHeight } from "./MainPage";

const ProfileImageAndName = () => {
  const { address = "0x" } = useAccount();
  const result = useEnsName({
    address,
    chainId: mainnet.id,
  });

  const displayContent = result.data || address;

  return (
    <Flex justifyContent="start" alignItems="center" columnGap="24px">
      <Center
        flexShrink={0}
        width={["55px", "62px", "76px"]}
        height={["55px", "62px", "76px"]}
        padding="12.667px"
        justifyContent="center"
        alignItems="center"
        bg="primary"
        borderRadius="316.667px"
      >
        <Image boxSize={["40px", "45px", "50px"]} src={avatarSmall}></Image>
      </Center>
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
      <Flex
        direction="column"
        width="100%"
        columnGap="24px"
        alignItems="stretch"
      >
        <FillButton>Deposit</FillButton>
      </Flex>
    </Flex>
  );
};

export const UserProfile = ({ ...rest }: any) => {
  const { userBalance, fmpBalance } = useUserFomopolyData();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const checkUserLogin = useCheckLogin();

  return (
    <Box>
      <Box
        width={TopBarHeight.map(value => `${value}px`)}
        height={TopBarHeight.map(value => `${value}px`)}
        bg="none"
        p="0px"
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
        onClick={() => {
          if (!checkUserLogin()) return;
          onOpen();
        }}
      >
        <Image boxSize={TopBarHeight.map(value => `${value}px`)} src={avatar}></Image>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          width={["85%", "auto", "564px"]}
          minW={["85%", "300px", "564px"]}
          height="auto"
          p="16px"
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
