import {FC, memo} from "react";
import {HStack, Text} from "@chakra-ui/react";

interface TitleSectionProps {
  title: string;
}

const TitleSectionComponent: FC<TitleSectionProps> = ({ title }) => {
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
};

export default memo(TitleSectionComponent);
