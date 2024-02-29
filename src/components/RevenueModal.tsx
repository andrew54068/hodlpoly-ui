import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Text,
  Box,
} from "@chakra-ui/react";
import Button from "src/components/Button";

interface RewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  revenueETH: string;
  claimableBalanceETH: string;
}

const RevenueModal: React.FC<RewardModalProps> = ({
  isOpen,
  onClose,
  revenueETH,
  claimableBalanceETH,
}) => {
  // Function to handle the claim reward logic
  const handleClaimReward = () => {
    // Implement claim logic here
    console.log("Claiming reward...");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        backgroundColor="gray.oliver.dark"
        borderRadius={0}
        color="white"
        minW="564px"
        p="16px"
        pt="56px"
      >
        <ModalCloseButton />
        <ModalBody>
          <Box
            p="24px"
            backgroundColor="background.dark"
            border="2px solid"
            borderColor="gray.oliver"
          >
            <Box mb="12px" p="20px">
              <Box color="gray.oliver" mb="16px">
                Revenue
              </Box>

              <Text
                fontSize="24px"
                fontWeight={500}
                lineHeight="16.3px"
                color="primary"
              >
                {revenueETH} ETH
              </Text>
            </Box>

            <Box background="gray.oliver" borderRadius="10px" p="20px">
              <Box color="text.black" mb="16px">
                Claimable Balance
              </Box>
              <Text
                fontSize="24px"
                fontWeight={500}
                lineHeight="16.3px"
                color="primary"
              >
                {revenueETH} ETH
              </Text>
              <Button
                onClick={handleClaimReward}
                w="100%"
                p="10px 16px"
                mt="24px"
              >
                Claim Reward
              </Button>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RevenueModal;
