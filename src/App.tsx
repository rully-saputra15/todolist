import {useCallback, useState} from "react";
import {v4 as uuidv4} from "uuid";
import "./App.css";
import {Button, HStack, Text, useDisclosure, useToast, VStack} from "@chakra-ui/react";
import {DragDropContext} from "react-beautiful-dnd";
import {useStore} from "./useStore";
import {MdAddCircle} from "react-icons/md";
import NewTaskModal from "./components/NewTaskModal";
import {entities} from "./constants";
import FooterComponent from "./components/FooterComponent";
import TodoListComponent from "./components/TodoListComponent";
import EditTaskModal from "./components/EditTaskModal";
import {EditTaskModalData} from "./interfaces";


const App = () => {
  const initialState = {
    editTaskModalData: {
      taskId: "",
      entityId: "",
      taskValue: ""
    }
  };
  const [mainTask, addTask, moveTask, editTask] =
    useStore(s => [s.mainTask, s.addTask, s.moveTask, s.editTask]);

  const [newTaskValue, setNewTaskValue] = useState("");
  const [editTaskModalData, setEditTaskModalData] = useState<EditTaskModalData>(initialState.editTaskModalData);
  const successToast = useToast();

  const handleShowToast = useCallback((message: string) => {
    successToast({
      title: message,
      status: "success",
      duration: 2000,
      position: "bottom",
      isClosable: true
    });
  },[successToast])

  const {
    isOpen: isOpenNewTaskModal,
    onOpen,
    onClose: onCloseNewTaskModal
  }
    = useDisclosure();

  const {
    isOpen: isOpenEditTaskModal,
    onOpen: onOpenEditTaskModal,
    onClose: onCloseEditTaskModal
  }
    = useDisclosure();

  const handleChangeNewTaskValue = useCallback((titleTask: string) => {
    setNewTaskValue(titleTask);
  }, [newTaskValue]);

  const handleAddNewTask = useCallback(() => {
    addTask({
      id: uuidv4(),
      title: newTaskValue
    });
    setNewTaskValue("");
    onCloseNewTaskModal();
    handleShowToast("New Task Successfully Added");
  }, [newTaskValue, handleShowToast]);

  const handleOpenEditTaskModal = useCallback((taskId: string, entityId: string, taskValue: string) => {
    setEditTaskModalData({
      taskId: taskId,
      entityId: entityId,
      taskValue: taskValue
    });
    onOpenEditTaskModal();
  }, [onOpenEditTaskModal, setEditTaskModalData]);

  const handleEditTaskModal = useCallback((titleTask: string) => {
    setEditTaskModalData({
      taskId: editTaskModalData.taskId,
      taskValue: titleTask,
      entityId: editTaskModalData.entityId
    });
  }, [newTaskValue, setEditTaskModalData, editTaskModalData]);

  const handleUpdateTaskValue = useCallback(() => {
    const updatedMainTask = { ...mainTask };
    const updatedSpecificTaskLocation =
      updatedMainTask[editTaskModalData.entityId].findIndex((task) => task.id === editTaskModalData.taskId);
    if (updatedSpecificTaskLocation >= 0) {
      updatedMainTask[editTaskModalData.entityId][updatedSpecificTaskLocation].title = editTaskModalData.taskValue;
      editTask(updatedMainTask);
    }
    setEditTaskModalData(initialState.editTaskModalData);
    onCloseEditTaskModal();
    handleShowToast("Task Successfully Edited")
  }, [mainTask, editTask, editTaskModalData, setEditTaskModalData, initialState.editTaskModalData, onCloseEditTaskModal]);

  const onDragEnd = useCallback((result) => {
    let updatedMainTask = { ...mainTask };
    const destinationId = result.destination.droppableId;
    const sourceId = result.source.droppableId;
    const sourceTaskId = result.source.index;
    if (sourceId !== destinationId) {
      updatedMainTask = {
        ...updatedMainTask,
        [destinationId]: [
          ...updatedMainTask[destinationId], updatedMainTask[sourceId][sourceTaskId]
        ],
        [sourceId]: [
          ...updatedMainTask[sourceId].slice(0, sourceTaskId),
          ...updatedMainTask[sourceId].slice(sourceTaskId + 1)
        ]
      };
      moveTask(updatedMainTask);
    }
  }, [mainTask]);

  const handleOpenNewTab = useCallback((url: string) => {
    window.open(url, "_blank");
  }, []);

  return (
    <>
      <VStack mx={10} justifyContent="space-between">
        <Text bgGradient="linear(to-l, #667eea, #764ba2)"
              bgClip="text"
              fontSize="6xl"
              fontWeight="extrabold">
          Todo List
        </Text>
        <Button leftIcon={<MdAddCircle/>}
                onClick={onOpen}
                colorScheme="blue"
                variant="outline" size="md">
          Add New Task
        </Button>
        <DragDropContext onDragEnd={onDragEnd}>
          <HStack justifyContent="space-around" w="100%" alignItems="flex-start" flexWrap="wrap">
            <TodoListComponent entity={entities[0]}
                               data={mainTask.tasks}
                               handleOpenEditTaskModal={handleOpenEditTaskModal}/>
            <TodoListComponent entity={entities[1]}
                               data={mainTask.inProgress}
                               handleOpenEditTaskModal={handleOpenEditTaskModal}/>
            <TodoListComponent entity={entities[2]}
                               data={mainTask.done}
                               handleOpenEditTaskModal={handleOpenEditTaskModal}/>
          </HStack>
        </DragDropContext>
        <FooterComponent handleOpenNewTab={handleOpenNewTab}/>
      </VStack>
      <NewTaskModal isOpen={isOpenNewTaskModal}
                    onClose={onCloseNewTaskModal}
                    newTaskValue={newTaskValue}
                    handleAddNewTask={handleAddNewTask}
                    handleChangeNewTaskValue={handleChangeNewTaskValue}/>
      <EditTaskModal isOpen={isOpenEditTaskModal}
                     onClose={onCloseEditTaskModal}
                     editTaskModalData={editTaskModalData}
                     handleChangeNewTaskValue={handleEditTaskModal}
                     handleUpdateTaskValue={handleUpdateTaskValue}
      />
    </>
  );
};

export default App;
