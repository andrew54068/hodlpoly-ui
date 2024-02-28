import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/react";
import DicePendingImage from "src/assets/roll-dice-pending.svg?react";

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
        height="auto"
        p="16px"
        pt="40px"
        maxW="564px"
        borderRadius="0px"
        bg="#25291B"
      >
        <ModalBody p="0">
          <DicePendingImage width="100%" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
