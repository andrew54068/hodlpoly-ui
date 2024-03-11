import {
  Flex,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Box,
} from "@chakra-ui/react";
import fomopolyAbi from "src/abi/fomopoly";
import { FOMOPOLY_PROXY_ADDRESS } from "src/constants";
import { useReadContract, useAccount } from "wagmi";
import { blastSepolia } from "wagmi/chains";
import { MAX_DISPLAY_ETHER_DIGITS } from "src/utils/constants";
import { formatEther } from "viem";
import Button from "src/components/Buttons/Button";
import useUserFomopolyData from "src/hooks/useUserFomopolyData";
import useUserActions from "src/hooks/useUserActions";

const CHAIN_ID = blastSepolia.id;

// format number to  a 4 digit string
const formatLandId = (num: number) => {
  if (typeof num !== "number") return "0000";
  return num.toString().padStart(4, "0");
};

const BuyLandModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  // todo: get land trading volume
  const { userSteps = 0, allLandPrices } = useUserFomopolyData();
  const { buyLand } = useUserActions();

  const { data } =
    useReadContract({
      abi: fomopolyAbi.abi,
      address: FOMOPOLY_PROXY_ADDRESS,
      functionName: "getLand",
      args: [userSteps],
      chainId: CHAIN_ID,
    }) || {};

  const [, , landVolume = BigInt(0)] = data || [];
  const landPrice = allLandPrices?.[userSteps] || BigInt(0);

  const formattedLandPrice = parseFloat(formatEther(landPrice)).toFixed(
    MAX_DISPLAY_ETHER_DIGITS
  );
  const formattedLandVolume = parseFloat(
    formatEther(landVolume.toString())
  ).toFixed(MAX_DISPLAY_ETHER_DIGITS);

  const onClickBuy = async () => {
    try {
      await buyLand();
      onClose();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalContent
          minWidth="564px"
          padding="16px"
          backgroundColor="gray.oliver.dark"
          color="gray.oliver"
          borderRadius={0}
        >
          <ModalHeader minHeight="40px" />
          <ModalCloseButton top="16px" />
          <ModalBody p={0}>
            <Box
              borderColor="gray.oliver"
              border="1px"
              borderWidth="2px"
              padding="24px"
            >
              <Flex gap="24px" mb="40px">
                <Box
                  borderWidth="2px"
                  padding={0}
                  borderColor="gray.oliver"
                  width="100px"
                  height="120px"
                  position="relative"
                >
                  <Flex
                    borderWidth="2px 0 0 0 "
                    padding={0}
                    fontSize="13.7px"
                    fontWeight={600}
                    borderColor="gray.oliver"
                    color="gray.oliver"
                    width="98px"
                    height="82px"
                    position="absolute"
                    bottom={0}
                    left={0}
                    justifyContent="center"
                    alignItems="center"
                  >
                    {`${formatLandId(userSteps)}`}
                  </Flex>
                </Box>
                <Flex flexDirection="column">
                  <Box mb="28px">
                    <Text
                      color="gray.oliver"
                      fontSize="16px"
                      mb="12px"
                      lineHeight="16.3px"
                    >
                      Land Price
                    </Text>
                    <Text fontSize="24px" color="primary" lineHeight="16.3px">
                      {formattedLandPrice ?? 0} ETH
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      color="gray.oliver"
                      fontSize="16px"
                      mb="12px"
                      lineHeight="16.3px"
                    >
                      Volume
                    </Text>
                    <Text fontSize="24px" color="primary" lineHeight="16.3px">
                      {formattedLandVolume ?? 0} ETH
                    </Text>
                  </Box>
                </Flex>
              </Flex>
              <Button
                backgroundColor="primary"
                _hover={{ bg: "#e3e162" }}
                size="lg"
                width="full"
                onClick={onClickBuy}
              >
                Buy
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BuyLandModal;
