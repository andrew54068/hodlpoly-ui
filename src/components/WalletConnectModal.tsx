
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react'
import Button from 'src/components/Button'
import { useConnect } from "wagmi";


export const WalletOptions = ({ onClose }) => {
  const { connectors, connect } = useConnect();
  return (
    <Box>
      {connectors.map((connector) => (
        <Button
          key={connector.uid}
          onClick={async () => {
            onClose();
            await connect({ connector });
          }}
        >
          {connector.name}
        </Button>
      ))}
    </Box>
  );
};



export const ConnectModalProvider = ({ children, isOpen, onClose }) => {
  return (
    <>
      {children}
      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Connect Wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <WalletOptions onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </ Modal>
    </>
  );
};