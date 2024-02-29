import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/react";
import Dice from "src/assets/dice.svg?react";
import { motion } from "framer-motion";

const DiceRoll = () => {
  // for infinity animation effect
  const extendedDiceNumbers = [5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4];
  const visibleNumbersHeight = extendedDiceNumbers.length * 100;
  const animationSettings = {
    initial: { y: 0 },
    animate: { y: -visibleNumbersHeight },
    transition: {
      duration: 1,
      ease: "linear",
      repeat: Infinity,
    },
  };

  return (
    <Box
      overflow="hidden"
      height="100px"
      width="100px"
      position="relative"
      ml="24px"
    >
      <motion.div {...animationSettings}>
        {extendedDiceNumbers.map((number, index) => (
          <Box
            key={index}
            height="100px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="128px"
            w="62px"
            mb="24px"
            color="#FCFC54"
            textShadow="0px 0px 10px #FCFC54"
          >
            {number}
          </Box>
        ))}
      </motion.div>
    </Box>
  );
};

export default function PendingDiceModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        width="564px"
        height="380px"
        p="16px"
        pt="40px"
        maxW="564px"
        borderRadius="0px"
        bg="gray.oliver.dark"
      >
        <ModalBody
          p="24px"
          w="100%"
          bg="background.dark"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Flex justify="center" align="center">
            <Dice width="158px" height="150px" />
            <DiceRoll />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
