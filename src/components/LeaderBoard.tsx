import {
  Box,
  Text,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { formatEther } from "viem";
import Marquee from "react-fast-marquee";
import useUserFomopolyData from "src/hooks/useUserFomopolyData";
import smallTicket from "src/assets/leaderBoard/small-ticket.svg";
import bigTicket from "src/assets/leaderBoard/big-ticket.svg";
import { fixDecimal } from "src/utils/fixDecimal";
import useCheckLogin from "src/hooks/useCheckLogin";

const normalRewardStyle = {
  bg: "none",
  width: "100%",
  height: "52px",
  justifyContent: "space-between",
  alignItems: "center",
  columnGap: "32px",
  m: "0px",
  p: "10px",
  background: "gray.oliver",
  boxShadow:
    "0px 25px 60px -15px rgba(16, 24, 40, 0.20), 0px 25px 60px -15px rgba(16, 24, 40, 0.12)",
};

const hoverRewardStyle = {
  borderRadius: "12px",
  background: "background.gray",
  boxShadow: "0px 0px 11px 0px #FCFC54",
};

const activeRewardStyle = {
  borderRadius: "12px",
  background: "gray.oliver",
  boxShadow:
    "0px 25px 60px -15px rgba(16, 24, 40, 0.20), 0px 25px 60px -15px rgba(16, 24, 40, 0.12), -5px 4px 0px 0px rgba(0, 0, 0, 0.40) inset",
};

export const LeaderBoard = ({ ...rest }: any) => {
  const { systemPool } = useUserFomopolyData();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const checkUserLogin = useCheckLogin();

  const prizeAmount: bigint = BigInt(systemPool ?? 0);

  return (
    <Box
      cursor={"pointer"}
      maxWidth={["50%", "60%", "700px"]}
      minWidth={["100px", "200px", "300px"]}
      display="flex"
      borderRadius="12px"
      {...normalRewardStyle}
      _hover={hoverRewardStyle}
      _active={activeRewardStyle}
      {...rest}
      onClick={() => {
        if (!checkUserLogin()) return;
        onOpen();
      }}
    >
      <Image src={smallTicket}></Image>
      <Marquee autoFill>
        <Box
          color="primary"
          fontSize="20px"
          fontStyle="normal"
          fontWeight="700"
          lineHeight="28px"
          letterSpacing="-0.4px"
          margin="10px 0px"
          p="10px 0px"
          width="150px"
        >
          {"$" + fixDecimal(Number(formatEther(prizeAmount)), 8)}
        </Box>
      </Marquee>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          height="auto"
          p="16px"
          width={["85%", "auto", "564px"]}
          minW={["85%", "300px", "564px"]}
          borderRadius="0px"
          background="gray.oliver.dark"
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
              border="2px solid #9EA889"
              background="background.dark"
              p="24px"
            >
              <Flex
                alignItems="center"
                gap="40px"
                justifyContent="space-between"
              >
                <Flex alignItems="center" gap="12px">
                  <Image src={bigTicket}></Image>
                  <Text
                    color="primary"
                    fontFamily="Inter"
                    fontSize="28px"
                    fontStyle="normal"
                    fontWeight="700"
                    lineHeight="36px"
                    letterSpacing="-0.56px"
                  >
                    $1000
                  </Text>
                </Flex>
              </Flex>
              <Flex
                direction="column"
                gap="24px"
                borderRadius="10px"
                background="gray.oliver"
                justifyContent="start"
                p="20px"
              >
                <Flex direction="column" rowGap="16px" alignItems="start">
                  <Text
                    color="text.black"
                    textAlign="center"
                    fontFamily="Inter"
                    fontSize="16px"
                    fontStyle="normal"
                    fontWeight="400"
                    lineHeight="16.3px"
                  >
                    Your Ticket
                  </Text>
                  <Text
                    color="primary"
                    textAlign="center"
                    fontFamily="Inter"
                    fontSize="24px"
                    fontStyle="normal"
                    fontWeight="500"
                    lineHeight="16.3px"
                  >
                    100 / 100%
                  </Text>
                </Flex>
                <Flex direction="column" rowGap="16px" alignItems="start">
                  <Text
                    color="text.black"
                    textAlign="center"
                    fontFamily="Inter"
                    fontSize="16px"
                    fontStyle="normal"
                    fontWeight="400"
                    lineHeight="16.3px"
                  >
                    Total Ticket
                  </Text>
                  <Text
                    color="primary"
                    textAlign="center"
                    fontFamily="Inter"
                    fontSize="24px"
                    fontStyle="normal"
                    fontWeight="500"
                    lineHeight="16.3px"
                  >
                    1000
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
