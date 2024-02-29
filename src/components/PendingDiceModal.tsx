import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Dice from "src/assets/dice.svg?react";
import { motion, AnimatePresence } from "framer-motion";

const DiceRoll = ({ result, setIsWaitingForMoving, setCurrentMoveSteps }) => {
  const [animationPlay, setAnimationPlay] = useState(true);
  const [animationY, setAnimationY] = useState(0);

  const extendedDiceNumbers = [1, 2, 3, 4, 5, 6, 1]; // 在末尾额外添加第一个数字以实现无缝循环

  useEffect(() => {
    if (result > 0) {
      console.log("result :", result);
      const index = extendedDiceNumbers.findIndex((num) => num === result);
      const positionY = -(index * 128) - index * 24;

      setAnimationY(positionY);
      setAnimationPlay(false);
      setTimeout(() => {
        setIsWaitingForMoving(false);
        setCurrentMoveSteps(0);
      }, 2000);
    }
  }, [result]);

  const animationSettings = {
    initial: { y: 0 },
    animate: { y: animationPlay ? -600 : animationY }, // 动画播放时无限滚动，否则滚动到指定的result位置
    transition: animationPlay
      ? { duration: 0.5, ease: "linear", repeat: Infinity }
      : { duration: 1, ease: "easeOut" },
  };

  return (
    <Box
      overflow="hidden"
      height="128px"
      width="100px"
      position="relative"
      ml="24px"
    >
      <AnimatePresence>
        <motion.div {...animationSettings}>
          {extendedDiceNumbers.map((number, index) => (
            <Box
              key={index}
              height="128px"
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
      </AnimatePresence>
    </Box>
  );
};

export default function PendingDiceModal({
  isOpen,
  onClose,
  result,
  setIsWaitingForMoving,
  setCurrentMoveSteps,
}: {
  isOpen: boolean;
  onClose: () => void;
  result: number;
  setIsWaitingForMoving: (isWaiting: boolean) => void;
  setCurrentMoveSteps: (steps: number) => void;
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
            <DiceRoll
              result={result}
              setCurrentMoveSteps={setCurrentMoveSteps}
              setIsWaitingForMoving={setIsWaitingForMoving}
            />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
