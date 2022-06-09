import {
  Box,
  Stack,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Checkbox,
  Button,
  Text,
  FormErrorMessage,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import {useFormik } from "formik"
import * as yup from "yup";
import { useAuth } from "contexts";
import { useState, useEffect } from "react";
import { toast } from "react-toastify"

export function LoginCard() {
  const {loginSignupHandler, serverError, serverResponse} = useAuth();
  let resetLoginForm;
  const formik = useFormik({
    initialValues:{
      email:"",
      password:""
    },
    validationSchema:yup.object({
      email:yup.string().required().email(),
      password:yup.string().required().min(4)
    }),
    onSubmit:(values, actions)=>{
      loginSignupHandler("/auth/login",values);
      resetLoginForm = actions.resetForm.bind(actions);
    }
  })
  useEffect(() => { // To handle response from the server
    if (serverError.response?.status === 401) {
      formik.setFieldError("password","Invalid Password")
      console.log(resetLoginForm)
    } else if (serverError.response?.status === 404) {
      formik.setFieldError("email","Email doesn't exists")
    } 
  }, [serverResponse, serverError]);

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Flex p={8} flex={1} align={"center"} justify={"center"}>
      <Stack spacing={4} w={"full"} maxW={"md"} as="form" onSubmit={formik.handleSubmit}>
        <Heading fontSize={"2xl"}>Sign in to your account</Heading>
        <FormControl id="email" isInvalid={formik.errors.email && formik.touched.email}>
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
        <Stack spacing={6}>
          <Stack
            direction={{ base: "column", sm: "row" }}
            align={"start"}
            justify={"space-between"}
          >
            <Checkbox>Remember me</Checkbox>
            <Text>
              New to Yorked?
              <Link to="/auth/signup">
                <Box as="span" color="primary.light">
                  Sign Up
                </Box>
              </Link>
            </Text>
          </Stack>
          <Button type="submit" colorScheme={"blue"} variant={"solid"}>
            Sign in
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
