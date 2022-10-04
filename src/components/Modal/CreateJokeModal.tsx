import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    VStack,
    FormLabel,
    Textarea,
    useToast,
    Select,
    Spinner,
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import axiosInstance from "src/utils/axiosInstance";
import { Category } from "@prisma/client";

export const getCategories = async (): Promise<Category[]> => {
    const res = await axiosInstance.get<Category[]>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/category`,
    );
    return res.data;
};

export default function CreateJokeModal(): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { register, handleSubmit } = useForm();
    const toast = useToast();
    const { data, isLoading } = useQuery(["categories"], getCategories);
    const { mutate, isLoading: createLoading } = useMutation(
        (data: FieldValues) => axiosInstance.post("/joke", data),
        {
            onSuccess: () => {
                toast({
                    title: "Joke created",
                    description: "Thank you for your contribution 😍",
                });
                onClose();
            },
        },
    );

    const onSubmit = (data: FieldValues) => {
        mutate({ ...data });
    };

    return (
        <>
            <Button onClick={onOpen}>Add a new joke 😜🥳</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Share a new joke with us 🥰</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack w="full" alignItems="flex-start" spacing={2}>
                            <FormLabel>
                                Choose a category for your joke
                            </FormLabel>
                            <Select
                                {...register("categoryId", { required: true })}
                            >
                                {!isLoading ? (
                                    data?.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))
                                ) : (
                                    <Spinner />
                                )}
                            </Select>
                            <FormLabel>Content of your joke 😜</FormLabel>
                            <Textarea
                                {...register("content", { required: true })}
                            />
                            <FormLabel>Answer</FormLabel>
                            <Textarea
                                {...register("answer", { required: true })}
                            />
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={handleSubmit(onSubmit)}
                            isLoading={createLoading}
                        >
                            Submit 🥳
                        </Button>
                        <Button colorScheme="red" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
