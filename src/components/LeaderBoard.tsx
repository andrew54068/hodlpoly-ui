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
  Button,
} from "@chakra-ui/react";
import { formatEther } from "viem";
import Marquee from "react-fast-marquee";
import useUserFomopolyData from "src/hooks/useUserFomopolyData";
import currencyDollar from "src/assets/currency-dollar.png";
import ticketBig from "src/assets/ticket-big.png";
import users from "src/assets/users.png";

interface RankCardProps {
  rank: string;
  name: string;
  value: string;
}

const RankCard = ({ rank, name, value }: RankCardProps) => {
  return (
    <Flex
      p="12px"
      width="auto"
      border="2px solid #000"
      background="#FCFCFC"
      alignItems="flex-start"
      gap="24px"
      flex="1 0 0"
      alignSelf="stretch"
    >
      <Box
        width="81px"
        height="31px"
        bg="linear-gradient(270deg, #FFF -26.8%, #000 30.45%)"
        color="#FCFCFC"
        textAlign="center"
        fontFamily="Inter"
        fontSize="16px"
        fontStyle="normal"
        fontWeight="600"
        lineHeight="30px"
      >
        {rank}
      </Box>
      <Flex width="100%" height="58%" direction="column">
        <Text
          color="var(--Neutral-900, #111827)"
          fontFamily="Inter"
          fontSize="13.7px"
          fontStyle="normal"
          fontWeight="600"
          lineHeight="16.3px"
        >
          {name}
        </Text>
        <Text
          color="var(--Neutral-600, #4B5563)"
          fontFamily="Inter"
          fontSize="10px"
          fontStyle="normal"
          fontWeight="400"
          lineHeight="16.3px"
        >
          {value}
        </Text>
      </Flex>
    </Flex>
  );
};

export const LeaderBoard = ({ ...rest }: any) => {
  const { landAmount, pool } = useUserFomopolyData();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const prizeAmount: bigint = BigInt(landAmount ?? 0) * (pool[1] ?? BigInt(0));

  return (
    <Box
      borderRadius="12px"
      background="linear-gradient(270deg, #FFF -26.8%, #000 30.45%)"
      p="10px"
      {...rest}
    >
      <Button
        bg="none"
        width="100%"
        height="100%"
        justifyContent="space-between"
        alignItems="center"
        columnGap="32px"
        m="0px"
        p="0px"
        _hover={{}}
        _active={{ bg: "none", transform: "scale(0.98)" }}
        onClick={onOpen}
      >
        <Image src={currencyDollar}></Image>
        <Marquee autoFill>
          <Box
            color="var(--Neutral-50, #F9FAFB)"
            fontSize="20px"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="28px"
            letterSpacing="-0.4px"
            margin="10px 0px"
            p="10px 0px"
            width="100px"
          >
            {"$" + formatEther(prizeAmount)}
          </Box>
        </Marquee>
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
              <Flex
                alignItems="center"
                gap="40px"
                justifyContent="space-between"
              >
                <Flex alignItems="center" gap="12px">
                  <Image src={ticketBig}></Image>
                  <Text
                    color="var(--Generic-Black, #000)"
                    fontFamily="Inter"
                    fontSize="28px"
                    fontStyle="normal"
                    fontWeight="700"
                    lineHeight="36px"
                    letterSpacing="-0.56px"
                  >
                    1000
                  </Text>
                </Flex>
                <Flex direction="column">
                  <Text
                    color="var(--Generic-Black, #000)"
                    fontFamily="Inter"
                    fontSize="20px"
                    fontStyle="normal"
                    fontWeight="600"
                    lineHeight="28px"
                    letterSpacing="-0.4px"
                  >
                    Your Rank
                  </Text>
                  <Flex gap="12px">
                    <Text
                      color="var(--Generic-Black, #000)"
                      fontFamily="Inter"
                      fontSize="18px"
                      fontStyle="normal"
                      fontWeight="500"
                      lineHeight="28px"
                    >
                      #0006
                    </Text>
                    <Flex alignItems="center" gap="4px">
                      <Image src={users} boxSize="12px"></Image>
                      <Text
                        color="var(--Generic-Black, #000)"
                        fontFamily="Inter"
                        fontSize="12px"
                        fontStyle="normal"
                        fontWeight="500"
                        lineHeight="20px"
                      >
                        out of 10000
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
              <Text
                color="var(--Neutral-500, #6B7280)"
                fontFamily="Inter"
                fontSize="14px"
                fontStyle="normal"
                fontWeight="500"
                lineHeight="16px"
              >
                You can protect your land 1 time wen someone step on you land.
                You can protect your land 1 time wen someone step on you land.
                You can protect your land 1 time wen someone step on you land
              </Text>
              <Flex direction="column" gap="12px">
                <RankCard rank="#0001" name="Jonathan" value="1000000000" />
                <RankCard rank="#0002" name="Mujing" value="1000000000" />
                <RankCard rank="#0003" name="Dawson" value="1000000000" />
                <RankCard rank="#0004" name="Rick" value="1000000000" />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};