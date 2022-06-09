import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useAuth } from "contexts";
export function SignupCard() {
  const { loginSignupHandler, serverError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  useEffect(()=>{
    console.log({serverError})
    if(serverError.errors){

    }
  },[serverError])
  const formik = useFormik({
    initialValues:{
      firstName:"",
      lastName:"",
      email:"",
      password:""
    },
    validationSchema:yup.object({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      email:yup.string().email(),
      password:yup.string().required().min(4)
    }),
    onSubmit:(values, actions)=>{
      loginSignupHandler("/auth/signup",values);
      actions.resetForm();
    }
  })
  return (
    <Stack spacing={4} p={8} flex={1} align={"center"} justify={"center"}>
      <Stack align={"center"}>
        <Heading fontSize={"4xl"} textAlign={"center"}>
          Sign up
        </Heading>
        <Text fontSize={"lg"} color={"gray.600"}>
          to enjoy all of our cool features ✌️
        </Text>
      </Stack>
      <Box rounded={"lg"} bg="transparent" boxShadow={"lg"} p={8} w="full">
        <Stack spacing={4} as="form" onSubmit={formik.handleSubmit}>
          <HStack>
            <Box flexGrow={1}>
              <FormControl id="firstName" isInvalid={formik.errors.firstName && formik.touched.firstName} isRequired>
                <FormLabel>First Name</FormLabel>
                <Input {...formik.getFieldProps("firstName")} type="text" />
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>
            </Box>
            <Box flexGrow={1}>
              <FormControl id="lastName" isInvalid={formik.errors.lastName && formik.touched.lastName } >
                <FormLabel>Last Name</FormLabel>
                <Input type="text" {...formik.getFieldProps("lastName")} />
                <FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
              </FormControl>
            </Box>
          </HStack>
          <FormControl id="email" isInvalid ={formik.errors.email && formik.touched.email} isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" {...formik.getFieldProps("email")} />
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </FormControl>
          <FormControl id="password" type="password" isInvalid={formik.errors.password && formik.touched.password} isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input type={showPassword ? "text" : "password"} {...formik.getFieldProps("password")} />
              <InputRightElement h={"full"}>
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          </FormControl>
          <Stack spacing={10} pt={2}>
            <Button onClick={formik.handleSubmit} type="submit" loadingText="Submitting" size="lg" colorScheme="blue">
              Sign up
            </Button>
          </Stack>
          <Stack pt={6}>
            <Text align={"center"}>
              Already a user?
              <Link to="/auth/login">
                <Text as="span" color="blue.400">
                Login
                </Text>
              </Link>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
