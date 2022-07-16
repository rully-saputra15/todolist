import {useCallback, useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";
import "./App.css";
import {Badge, Button, HStack, Text, useDisclosure, useToast, VStack} from "@chakra-ui/react";
import {DragDropContext} from "react-beautiful-dnd";
import {useStore} from "./useStore";
import {MdAddCircle} from "react-icons/md";
import NewTaskModal from "./components/NewTaskModal";
import {entities} from "./constants";
import FooterComponent from "./components/FooterComponent";
import TodoListComponent from "./components/TodoListComponent";
import EditTaskModal from "./components/EditTaskModal";
import {EditTaskModalData} from "./interfaces";
import moment from "moment";

const App = () => {
  const initialState = {
    editTaskModalData: {
      taskId: "",
      entityId: "",
      taskValue: ""
    }
  };
  const [mainTask, addTask, updateTask] =
    useStore(s => [s.mainTask, s.addTask, s.updateTask]);

  const [newTaskValue, setNewTaskValue] = useState("");
  const [nowTime, setNowTime] = useState(moment().format('LTS'));
  const [editTaskModalData, setEditTaskModalData] = useState<EditTaskModalData>(initialState.editTaskModalData);
  const [isTitleTaskFilled, setIsTitleTaskFilled] = useState(false);
  const [isTitleTaskUpdated, setIsTitleTaskUpdated] = useState(false);
  const successToast = useToast();

  useEffect(() => {
    setInterval(() => setNowTime(moment().format('LTS')),1000);
  },[])

  const handleShowToast = useCallback((message: string) => {
    successToast({
      title: message,
      status: "success",
      duration: 2000,
      position: "bottom",
      isClosable: true
    });
  }, [successToast]);

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
    setIsTitleTaskFilled(titleTask !== '');
    setNewTaskValue(titleTask);
  }, [newTaskValue]);

  const handleAddNewTask = useCallback(() => {
    addTask({
      id: uuidv4(),
      title: newTaskValue
    });
    setNewTaskValue("");
    setIsTitleTaskFilled(false);
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
    const mainTaskSearchedLocation = mainTask[editTaskModalData.entityId]
      .findIndex((task) => task.id === editTaskModalData.taskId);
    const selectedTitleTask = mainTask[editTaskModalData.entityId][mainTaskSearchedLocation].title;
    setIsTitleTaskUpdated(selectedTitleTask !== titleTask)
    setEditTaskModalData({
      taskId: editTaskModalData.taskId,
      taskValue: titleTask,
      entityId: editTaskModalData.entityId
    });
  }, [mainTask, newTaskValue, setEditTaskModalData, editTaskModalData]);

  const handleUpdateTaskValue = useCallback(() => {
    const updatedMainTask = { ...mainTask };
    const updatedSpecificTaskLocation =
      updatedMainTask[editTaskModalData.entityId].findIndex((task) => task.id === editTaskModalData.taskId);
    if (updatedSpecificTaskLocation >= 0) {
      updatedMainTask[editTaskModalData.entityId][updatedSpecificTaskLocation].title = editTaskModalData.taskValue;
      updateTask(updatedMainTask);
    }
    setEditTaskModalData(initialState.editTaskModalData);
    onCloseEditTaskModal();
    handleShowToast("Task Successfully Edited");
  }, [mainTask, updateTask, editTaskModalData, setEditTaskModalData, initialState.editTaskModalData, onCloseEditTaskModal]);

  const handleDeleteTask = useCallback((taskId: string, entityId: string) => {
    const updatedMainTask = { ...mainTask };
    const specificTaskLocation = updatedMainTask[entityId].findIndex((task) => task.id === taskId);
    if (specificTaskLocation >= 0) {
      updatedMainTask[entityId] = [
        ...updatedMainTask[entityId].slice(0, specificTaskLocation),
        ...updatedMainTask[entityId].slice(specificTaskLocation + 1)
      ];
      updateTask(updatedMainTask);
    }
  }, [mainTask, updateTask]);

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
      updateTask(updatedMainTask);
    }
  }, [mainTask, updateTask]);

  const handleOpenNewTab = useCallback((url: string) => {
    window.open(url, "_blank");
  }, []);

  return (
    <>
      <VStack mx={10} justifyContent="space-between" h="100vh">
        <VStack w="100%">
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
            <HStack justifyContent="space-evenly"
                    w="100%"
                    alignItems="flex-start"
                    flexWrap="wrap">
              <TodoListComponent entity={entities[0]}
                                 data={mainTask.tasks}
                                 animationOffsetY="100px"
                                 handleDeleteTask={handleDeleteTask}
                                 handleOpenEditTaskModal={handleOpenEditTaskModal}/>
              <TodoListComponent entity={entities[1]}
                                 data={mainTask.inProgress}
                                 animationOffsetY="200px"
                                 handleDeleteTask={handleDeleteTask}
                                 handleOpenEditTaskModal={handleOpenEditTaskModal}/>
              <TodoListComponent entity={entities[2]}
                                 data={mainTask.done}
                                 animationOffsetY="300px"
                                 handleDeleteTask={handleDeleteTask}
                                 handleOpenEditTaskModal={handleOpenEditTaskModal}/>
            </HStack>
          </DragDropContext>
        </VStack>
        <FooterComponent handleOpenNewTab={handleOpenNewTab}/>
      </VStack>
      <Badge pos="absolute"
             fontSize="1.2em"
             variant="solid"
             top="1"
             right="1"
             colorScheme="blue">
        {nowTime}
      </Badge>
      <NewTaskModal isOpen={isOpenNewTaskModal}
                    onClose={onCloseNewTaskModal}
                    newTaskValue={newTaskValue}
                    isTitleTaskFilled={isTitleTaskFilled}
                    handleAddNewTask={handleAddNewTask}
                    handleChangeNewTaskValue={handleChangeNewTaskValue}/>
      <EditTaskModal isOpen={isOpenEditTaskModal}
                     isTitleTaskUpdated={isTitleTaskUpdated}
                     onClose={onCloseEditTaskModal}
                     editTaskModalData={editTaskModalData}
                     handleChangeNewTaskValue={handleEditTaskModal}
                     handleUpdateTaskValue={handleUpdateTaskValue}
      />
    </>
  );
};

export default App;
