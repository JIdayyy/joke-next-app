import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import AuthLayout from "@components/Layouts/AuthLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import useUserContext from "src/context/UserContext";
import axiosInstance from "src/utils/axiosInstance";

export default function Login(): JSX.Element {
    const { register, handleSubmit } = useForm();
    const userContext = useUserContext();
    const router = useRouter();
    const { mutate, isLoading } = useMutation(
        (data: FieldValues) => axiosInstance.post("/auth/login", data),
        {
            onSuccess: (data) => {
                const { authorization } = data.headers;
                axiosInstance.defaults.headers["Authorization"] = authorization;
                localStorage.setItem("token", authorization);
                userContext?.setUser(data.data);
                router.push("/");
            },
        },
    );

    const onSubmit = (data: FieldValues) => {
        mutate(data);
    };

    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"}>Sign in to Wild Joke</Heading>
                    <Text fontSize={"lg"} color={"gray.600"}>
                        to enjoy all of our cool features ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email</FormLabel>
                            <Input {...register("email")} type="email" />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input {...register("password")} type="password" />
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: "column", sm: "row" }}
                                align={"start"}
                                justify={"space-between"}
                            >
                                <Text>No account yet ?</Text>
                                <Link href="/auth/register">
                                    <Text cursor="pointer" color={"blue.400"}>
                                        come here !
                                    </Text>
                                </Link>
                            </Stack>
                            <Button
                                isLoading={isLoading}
                                onClick={handleSubmit(onSubmit)}
                                bg={"blue.400"}
                                color={"white"}
                                _hover={{
                                    bg: "blue.500",
                                }}
                            >
                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}

Login.Layout = AuthLayout;
