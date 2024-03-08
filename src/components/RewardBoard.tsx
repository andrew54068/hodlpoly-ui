import {
  useDisclosure,
  Box,
  Flex,
  Image,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import useUserFomopolyData from "src/hooks/useUserFomopolyData";
import money from "src/assets/money.svg";
import { formatEther } from "viem";
import { MAX_DISPLAY_ETHER_DIGITS } from "src/utils/constants";
import useCheckLogin from "src/hooks/useCheckLogin";
import RevenueModal from "./RevenueModal";

const normalRewardStyle = (isMobile: boolean) => {
  return {
    width: isMobile ? "52px" : "180px",
    height: isMobile ? "52px" : "52px",
    borderRadius: "12px",
    border: "2px solid #FCFC54",
    boxShadow: "0px 2px 6px 0px rgba(16, 24, 40, 0.06)",
    padding: "12px",
  };
};

const hoverRewardStyle = {
  border: "2px solid #FCFC54",
  boxShadow: "0px 2px 6px 0px rgba(16, 24, 40, 0.06), 0px 0px 5px 0px #FCFC54",
};

const activeRewardStyle = {
  boxShadow:
    "0px 2px 6px 0px rgba(16, 24, 40, 0.06), 0px 2px 2px 0px rgba(0, 0, 0, 0.25) inset",
};

export const RewardBoard = ({ ...rest }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const checkLogin = useCheckLogin();
  const { userPendingReward } = useUserFomopolyData();

  const formattedReward = parseFloat(formatEther(userPendingReward)).toFixed(
    MAX_DISPLAY_ETHER_DIGITS
  );

  return (
    <Box
      cursor={"pointer"}
      onClick={() => {
        if (!checkLogin()) return;
        onOpen();
      }}
      {...normalRewardStyle(isMobile)}
      _hover={hoverRewardStyle}
      _active={activeRewardStyle}
      {...rest}
    >
      <Flex height="100%" justifyContent="space-between" alignItems="center">
        <Image src={money}></Image>
        {!isMobile && (
          <Text
            color="gray.oliver"
            fontSize="18px"
            fontStyle="normal"
            fontWeight="600"
            lineHeight="28px"
          >
            {formattedReward}
          </Text>
        )}
      </Flex>
      <RevenueModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
