import { React, useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Input,
  Select,
  Text,
  VStack,
  Wrap,
  Heading,
  List,
  ListIcon,
  OrderedList,
  Link,
  UnorderedList,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  AspectRatio,
  useDisclosure,
  FormLabel,
  FormControl,
  Stack,
  Checkbox,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

import b2b2 from "../assets/b2b2.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AuthRegisterAction } from "../../Redux/Auth/Auth.Action";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
    userName: "",
    phoneNumber: "",
  });

  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleRegister = (e) => {
    dispatch(AuthRegisterAction(form, navigate));
  };

  return (
    <HStack
      bgImage={""}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        // backgroundPosition: "center",
        // boxSizing: "border-box",
      }}
      flexDirection={{
        base: "column",
        md: "row",
        lg: "row",
      }}
      bgColor={"rgb(1,37,70)"}
    >
      <Box
        bgColor={"rgb(1,37,70)"}
        width={{ base: "100%", md: "50%", lg: "50%" }}
        color={"white"}
        padding={"30px"}
      >
        <Flex
          style={{ justifyContent: "space-evenly" }}
          flexDirection={"column"}
          gap={"100px"}
        >
          <VStack>
            <h2>1. Expert consultation</h2>
            <Text color={"whiteAlpha.900"}>
              {" "}
              Our experts can identify potential threats & mitigate strategies
              for your business
            </Text>
          </VStack>
          <VStack>
            <h2>2. Timely reminders</h2>
            <Text color={"whiteAlpha.900"}>
              {" "}
              Increase efficiency & mange time by staying updated on all
              compliances
            </Text>
          </VStack>
          <VStack>
            <h2>3. One location access</h2>
            <Text color={"whiteAlpha.900"}>
              {" "}
              Manage, monitor, and analyze all of your businesses from a single
              accessible dashboard
            </Text>
          </VStack>
        </Flex>
      </Box>
      <VStack
        bgImage={b2b2}
        style={{
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "scroll",
          backgroundSize: "cover",
          // backgroundPosition: "center",
          boxSizing: "border-box",
          margin: "auto",
        }}
        className="container"
        width={{ base: "80%", md: "50%", lg: "50%" }}
        padding={"10px"}
        color={"white"}
      >
        <h1>Sign Up</h1>
        <Box
          className="container"
          rounded={"lg"}
          // bg={useColorModeValue('rbg(200,200,200)',)}
          color={"white"}
          boxShadow={"outline"}
          p={8}
          width={{ base: "100%", md: "80%", lg: "80%" }}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="fullname">
              <FormLabel>Full Name</FormLabel>
              <Input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl >
              <FormLabel>User Name</FormLabel>
              <Input
                type="text"
                name="userName"
                value={form.userName}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="phoneno">
              <FormLabel>Phone No.</FormLabel>
              <Input
                type="number"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
            </FormControl>

            <Stack spacing={10}>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleRegister}
              >
                Sign Up
              </Button>
            </Stack>
          </Stack>
        </Box>
      </VStack>
    </HStack>
  );
};

export default SignUp;
