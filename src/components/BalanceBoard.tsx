import { Box, Flex, Image, Text } from "@chakra-ui/react";
import useUserFomopolyData from "src/hooks/useUserFomopolyData";
import logo from "src/assets/logo.png";
import { formatEther } from "viem";

export const BalanceBoard = ({ ...rest }: any) => {
  const { playerClaimableReward } = useUserFomopolyData();

  return (
    <Box
      borderRadius="12px"
      border="4px solid #000"
      background="var(--Generic-White, #FFF)"
      boxShadow="0px 2px 6px 0px rgba(16, 24, 40, 0.06)"
      p="8px"
      {...rest}
    >
      <Flex height="100%" justifyContent="space-between" alignItems="center">
        <Image src={logo}></Image>
        <Text
          color="var(--Neutral-500, #6B7280)"
          fontSize="18px"
          fontStyle="normal"
          fontWeight="600"
          lineHeight="28px"
        >
          {formatEther(playerClaimableReward)}
        </Text>
      </Flex>
    </Box>
  );
};
