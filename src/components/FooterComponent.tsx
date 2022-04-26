import {FC} from "react";
import {HStack, Text, VStack} from "@chakra-ui/react";
import {SiChakraui} from "react-icons/si";
import {FaGithub, FaInstagram, FaLinkedin} from "react-icons/fa";

interface FooterComponentProps {
  handleOpenNewTab: (urL: string) => void;
}

const FooterComponent: FC<FooterComponentProps> = ({ handleOpenNewTab }) => {
  return (
    <VStack alignItems="center" justifyContent="flex-start" spacing={4} pos="absolute" bottom={1}>
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
  );
};

export default FooterComponent;
