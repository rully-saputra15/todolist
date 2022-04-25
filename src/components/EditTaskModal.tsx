import {FC} from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton, ModalContent, ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react";
import {IoCreateOutline} from "react-icons/io5";
import {EditTaskModalData} from "../interfaces";

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  editTaskModalData: EditTaskModalData;
  handleChangeNewTaskValue: (titleTask: string) => void;
  handleUpdateTaskValue: () => void;
}

const EditTaskModal: FC<EditTaskModalProps> = (
  {
    isOpen,
    onClose,
    editTaskModalData,
    handleChangeNewTaskValue,
    handleUpdateTaskValue
  }
) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Edit Task</ModalHeader>
        <ModalCloseButton onClick={onClose}/>
        <ModalBody>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input placeholder="ex: 5 mins read book"
                   value={editTaskModalData.taskValue}
                   onChange={(ev) => handleChangeNewTaskValue(ev.currentTarget.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue"
                  rightIcon={<IoCreateOutline/>}
                  onClick={handleUpdateTaskValue}>
            Oke
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditTaskModal;
