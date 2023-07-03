import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import CardComponent from "./card.component";

const CardModal = ({ onClose, isOpen, modalItem }) => {
  return (
    <Box zIndex="9999">
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent margin="0 5px" padding="0" paddingTop="10px">
          <ModalCloseButton />
          <ModalBody margin="0" padding="0">
            <CardComponent item={modalItem} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CardModal;
