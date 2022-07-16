import {FC} from "react";
import {
  Button, FormControl, FormErrorMessage, FormLabel, Input,
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
  isTitleTaskFilled: boolean;
  onClose: () => void;
  newTaskValue: string;
  handleAddNewTask: () => void;
  handleChangeNewTaskValue: (titleTask: string) => void;
}

const NewTaskModal: FC<NewTaskModalProps> = (
  {
    isOpen,
    isTitleTaskFilled,
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
                   required
                   onChange={(ev) => handleChangeNewTaskValue(ev.currentTarget.value)}
            />
            {
              !isTitleTaskFilled && (
                <FormErrorMessage>Task title is required.</FormErrorMessage>
              )
            }
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue'
                  disabled={!isTitleTaskFilled}
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
