// LoginModal.tsx
import React from "react";
import { useConnect } from "wagmi";
import {
  Box,
  Flex,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";
import Button from "src/components/Button";
import MetamaskLogo from "src/assets/metamask-logo.svg";
import BloctoLogo from "src/assets/blocto-logo.svg";
import { logConnectSuccessfully } from "src/services/Amplitude/log";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const iconMapping = {
  blocto: BloctoLogo,
  injected: MetamaskLogo,
};
export const WalletOptions = ({ onClose }) => {
  const { connectors, connect } = useConnect();
  return (
    <Flex gap="12px" flexDir="column">
      {connectors.map((connector) => (
        <Button
          variant="secondary"
          key={connector.uid}
          padding="6px 12px"
          onClick={async () => {
            onClose();
            await connect({ connector });
            logConnectSuccessfully();
          }}
        >
          <Flex justifyContent="space-between" width="100%" alignItems="center">
            <Box width="32px" height="32px">
              {iconMapping[connector?.id] && (
                <Image src={iconMapping[connector?.id]} />
              )}
            </Box>
            <Box
              color="gray.oliver"
              fontSize="12px"
              lineHeight="20px"
              mx="auto"
            >
              {connector.name === "Injected" ? "Metamask" : connector.name}
            </Box>
          </Flex>
        </Button>
      ))}
    </Flex>
  );
};

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        background="background.dark"
        boxShadow="none"
        borderColor="primary"
        borderWidth="2px"
        padding="20px"
      >
        <ModalBody bg="background.dark">
          <Box color="primary" textAlign="center" fontSize="24px" mb="20px">
            Connect Wallet
          </Box>
          <WalletOptions onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
