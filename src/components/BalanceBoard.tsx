import { useDisclosure, Box, Flex, Image, Text } from "@chakra-ui/react";
import useUserFomopolyData from "src/hooks/useUserFomopolyData";
import logo from "src/assets/logo.png";
import { formatEther } from "viem";
import { MAX_DISPLAY_ETHER_DIGITS } from "src/utils/constants";
import RevenueModal from "./RevenueModal";

export const BalanceBoard = ({ ...rest }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { playerClaimableReward } = useUserFomopolyData();
  const formattedReward = parseFloat(
    formatEther(playerClaimableReward)
  ).toFixed(MAX_DISPLAY_ETHER_DIGITS);
  return (
    <Box
      borderRadius="12px"
      border="4px solid #000"
      background="var(--Generic-White, #FFF)"
      boxShadow="0px 2px 6px 0px rgba(16, 24, 40, 0.06)"
      p="8px"
      cursor={"pointer"}
      onClick={onOpen}
      {...rest}
    >
      <Flex
        height="100%"
        justifyContent="space-between"
        alignItems="center"
        minWidth="160px"
      >
        <Image src={logo}></Image>
        <Text
          color="var(--Neutral-500, #6B7280)"
          fontSize="18px"
          fontStyle="normal"
          fontWeight="600"
          lineHeight="28px"
        >
          {formattedReward}
        </Text>
      </Flex>
      <RevenueModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
