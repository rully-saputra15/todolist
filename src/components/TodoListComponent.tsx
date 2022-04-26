import {FC} from "react";
import TitleSection from "./TitleSectionComponent";
import {Draggable, Droppable} from "react-beautiful-dnd";
import {Box, IconButton, ScaleFade, SlideFade, Text, VStack} from "@chakra-ui/react";
import {Entity, Task} from "../interfaces";
import {CloseIcon, EditIcon} from "@chakra-ui/icons";

interface TodoListComponentProps {
  entity: Entity;
  data: Task[];
  animationOffsetY: string;
  handleOpenEditTaskModal: (taskId: string, entityId: string, taskValue: string) => void;
  handleDeleteTask: (taskId: string, entityId: string) => void;
}

const TodoListComponent: FC<TodoListComponentProps> = (
  {
    entity,
    data,
    animationOffsetY,
    handleOpenEditTaskModal,
    handleDeleteTask
  }
) => {
  return (
    <SlideFade in={true} offsetY={animationOffsetY}>
      <VStack alignItems="center" w="md" h="lg">
        <TitleSection title={entity.title}/>
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
                            <ScaleFade initialScale={0.4} in={true}>
                              <Box p={4}
                                   mb={2}
                                   bg={entity.color}
                                   borderRadius={15}
                                   {...providedDraggable.draggableProps}
                                   {...providedDraggable.dragHandleProps}
                                   ref={providedDraggable.innerRef}>
                                <Text>{task.title}</Text>
                                <IconButton
                                  mr={2}
                                  mt={2}
                                  colorScheme="teal"
                                  aria-label="Delete Task"
                                  size="xs"
                                  onClick={() => handleOpenEditTaskModal(task.id, entity.id, task.title)}
                                  icon={<EditIcon/>}
                                />
                                <IconButton
                                  mt={2}
                                  colorScheme="pink"
                                  aria-label="Delete Task"
                                  size="xs"
                                  onClick={() => handleDeleteTask(task.id, entity.id)}
                                  icon={<CloseIcon/>}
                                />
                              </Box>
                            </ScaleFade>
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
    </SlideFade>
  );
};

export default TodoListComponent;
