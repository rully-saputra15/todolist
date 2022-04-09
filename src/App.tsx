import {useCallback, useState} from "react";
import {v4 as uuidv4} from "uuid";
import "./App.css";
import {HStack, VStack, Text, Box, Button, useDisclosure, useToast} from "@chakra-ui/react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {useStore} from "./useStore";
import {FaGithub, FaInstagram, FaLinkedin} from "react-icons/fa";
import {SiChakraui} from "react-icons/si";
import {MdAddCircle} from "react-icons/md";
import {Entity, Task} from "./interfaces";
import NewTaskModal from "./components/NewTaskModal";
import {entities} from "./constants";

const App = () => {
  const [mainTask, addTask, moveTask] =
    useStore(s => [s.mainTask, s.addTask, s.moveTask]);

  const [newTaskValue, setNewTaskValue] = useState("");

  const successAddNewTaskToast = useToast();

  const {
    isOpen: isOpenNewTaskModal,
    onOpen,
    onClose: onCloseNewTaskModal
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
    successAddNewTaskToast({
      title: "New Task Successfully Added",
      status: "success",
      duration: 2000,
      position: "bottom",
      isClosable: true
    });
  }, [newTaskValue]);

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

  const renderTitleSection = useCallback((title: string) => {
    return (
      <HStack justifyContent="space-around"
              w="100%"
              border="2px"
              borderColor="lightblue"
              py={4}
              alignItems="center"
              rounded="2xl"
              boxShadow="md">
        <Text fontSize="lg" fontWeight={700} noOfLines={2}>{title}</Text>
      </HStack>
    );
  }, []);

  const renderTodoListSection = (entity: Entity, data: Task[]) => {
    return (
      <VStack alignItems="center" w="md" h={["lg","2xl"]}>
        {renderTitleSection(entity.title)}
        <Droppable droppableId={entity.id} type="tasks">
          {(providedDroppable, snapshot) => {
            return (
              <Box ref={providedDroppable.innerRef}
                   {...providedDroppable.droppableProps}
                   boxShadow="md"
                   w="100%"
                   minH={24}

                   overflowY="scroll"
                   sx={{
                     "&::-webkit-scrollbar": {
                       display: "none"
                     }
                   }}
                   borderWidth="1px"
                   borderColor="gray.300"
                   borderRadius="2xl"
                   p={4}
              >
                {
                  data?.map((task, index) => {
                    return (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(providedDraggable, snapshot) => {
                          return (
                            <Box p={4}
                                 mb={2}
                                 bg={entity.color}
                                 borderRadius={15}
                                 {...providedDraggable.draggableProps}
                                 {...providedDraggable.dragHandleProps}
                                 ref={providedDraggable.innerRef}>
                              <Text>{task.title}</Text>
                            </Box>
                          );
                        }}
                      </Draggable>
                    );
                  })
                }
                {providedDroppable.placeholder}
              </Box>
            );
          }}
        </Droppable>
      </VStack>
    );
  };
  return (
    <>
      <VStack mx={10} justifyContent="space-between">
        <Text bgGradient="linear(to-l, #4CCAFF, #3CBD96)"
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
            {renderTodoListSection(entities[0], mainTask.tasks)}
            {renderTodoListSection(entities[1], mainTask.inProgress)}
            {renderTodoListSection(entities[2], mainTask.done)}
          </HStack>
        </DragDropContext>
        <VStack alignItems="center" justifyContent="flex-start" spacing={4}>
          <HStack justifyContent="flex-start">
            <Text fontWeight={200}>Created by</Text>
            <Text fontWeight={700}>Rully Saputra</Text>
          </HStack>
          <HStack>
            <Text fontWeight={700}>Powered By Chakra UI</Text>
            <SiChakraui size="25px" color="#2ABFB3"/>
          </HStack>
          <HStack>
            <FaLinkedin size="30px"
                        color="#0e76a8"
                        className="social-media-icon"
                        onClick={() => handleOpenNewTab("https://www.linkedin.com/in/rully-saputra-7554a7138/")}/>
            <FaInstagram size="30px"
                         className="social-media-icon"
                         onClick={() => handleOpenNewTab("https://www.instagram.com/rully.saputra15/")}/>
            <FaGithub size="30px"
                      className="social-media-icon"
                      onClick={() => handleOpenNewTab("https://github.com/rully-saputra15")}/>
          </HStack>
        </VStack>
      </VStack>
      <NewTaskModal isOpen={isOpenNewTaskModal}
                    onClose={onCloseNewTaskModal}
                    newTaskValue={newTaskValue}
                    handleAddNewTask={handleAddNewTask}
                    handleChangeNewTaskValue={handleChangeNewTaskValue}/>

    </>
  );
};

export default App;
