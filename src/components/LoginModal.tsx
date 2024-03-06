// LoginModal.tsx
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  useTheme,
  Box,
  Link,
  Text,
} from "@chakra-ui/react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const theme = useTheme();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>FOMOPOLY</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <Button
              colorScheme="yellow"
              size="lg"
              leftIcon={<Box w="24px" h="24px" bg="gray.300" />}
            >
              Wallet Connect
            </Button>
            <Button
              colorScheme="orange"
              size="lg"
              leftIcon={<Box w="24px" h="24px" bg="gray.300" />}
            >
              Metamask
            </Button>
          </VStack>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Text fontSize="sm" color={theme.colors.gray[500]}>
            This site is protected by reCAPTCHA and the Google
            <Link
              href="https://policies.google.com/privacy"
              isExternal
              color="teal.500"
            >
              {" "}
              Privacy Policy{" "}
            </Link>
            and
            <Link
              href="https://policies.google.com/terms"
              isExternal
              color="teal.500"
            >
              {" "}
              Terms of Service{" "}
            </Link>
            apply.
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
