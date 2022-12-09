import {
  Box,
  Container,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { AiOutlineMenu } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";

import { Head } from "@/components/Head";
import { useAuth } from "@/hooks/useAuth";

import configJsonFile from "../../../config.json";

export interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { auth } = useAuth();

  const routes = [
    { path: "/", name: "Home" },
    { path: "/issue", name: "Issue" },
    { path: "/verify", name: "Verify" },
  ];

  return (
    <Flex minHeight={"100vh"} direction={"column"} bg={configJsonFile.style.color.black.bg}>
      <Head />
      <Container as="section" maxW="8xl">
        <Box as="nav" py="4">
          <HStack justify="space-between" alignItems={"center"} h="12">
            <Link href="/">
              <Image src={"/assets/icon.png"} alt="logo" h="8" rounded={configJsonFile.style.radius} />
            </Link>
            <HStack spacing="3">
              <ConnectButton accountStatus={"address"} showBalance={false} chainStatus={"icon"} />
              {auth && (
                <Menu>
                  <MenuButton
                    rounded={configJsonFile.style.radius}
                    as={IconButton}
                    aria-label="Options"
                    icon={<AiOutlineMenu />}
                    variant="outline"
                  />
                  <MenuList>
                    {routes.map(({ path, name }) => {
                      return <MenuItem key={path}>{name}</MenuItem>;
                    })}
                  </MenuList>
                </Menu>
              )}
            </HStack>
          </HStack>
        </Box>
      </Container>
      <Container maxW="lg" flex={1}>
        {children}
      </Container>
      <Container maxW="8xl">
        <Box as="nav" py="4">
          <HStack justify={"right"}>
            <HStack spacing={"4"}>
              <Link href={configJsonFile.url.github} target={"_blank"}>
                <Icon
                  as={FaGithub}
                  aria-label="github"
                  color={configJsonFile.style.color.white.text.secondary}
                  w={6}
                  h={6}
                />
              </Link>
            </HStack>
          </HStack>
        </Box>
      </Container>
    </Flex>
  );
};
