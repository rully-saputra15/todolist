import {FC} from "react";
import {
  Button, FormControl, FormLabel, Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react";
import {IoCreateOutline} from "react-icons/io5";

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  newTaskValue: string;
  handleAddNewTask: () => void;
  handleChangeNewTaskValue: (titleTask: string) => void;
}

const NewTaskModal: FC<NewTaskModalProps> = (
  {
    isOpen,
    onClose,
    newTaskValue,
    handleAddNewTask,
    handleChangeNewTaskValue
  }
) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Task</ModalHeader>
        <ModalCloseButton onClick={onClose}/>
        <ModalBody>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input placeholder='ex: 5 mins read book'
                   value={newTaskValue}
                   onChange={(ev) => handleChangeNewTaskValue(ev.currentTarget.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue'
                  rightIcon={<IoCreateOutline/>}
                  onClick={handleAddNewTask}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
};

export default NewTaskModal;
