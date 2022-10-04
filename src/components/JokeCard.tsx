import { Center, Spinner, Text, useColorMode } from "@chakra-ui/react";
import { Joke } from "@prisma/client";
import React, { Dispatch, SetStateAction } from "react";
import axiosInstance from "src/utils/axiosInstance";

export const getJoke = async (): Promise<Joke[]> => {
    const res = await axiosInstance.get<Joke[]>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/joke/random`,
    );
    return res.data;
};

interface IProps {
    showAnswer: boolean;
    setShowAnswer: Dispatch<SetStateAction<boolean>>;
    data: Joke[];
    isLoading: boolean;
}

export default function JokeCard({
    showAnswer,
    data,
    isLoading,
}: IProps): JSX.Element {
    const { colorMode } = useColorMode();

    if (!data) {
        return <Center>Error ...</Center>;
    }

    if (data.length === 0) {
        return <Center>No jokes found</Center>;
    }

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <Center
            justifyContent="space-between"
            bg={colorMode === "light" ? "#1A202C" : "white"}
            minW={["95%", "85%", "70%", "50%"]}
            p={10}
            rounded="md"
            fontSize={[20, 25, 35]}
            minH="300px"
            flexDirection="column"
        >
            <Text
                fontWeight="bold"
                textAlign="center"
                color={colorMode === "light" ? "white" : "black"}
            >
                {data[0].content}
            </Text>

            {showAnswer && (
                <Text
                    fontSize={[12, 17, 25]}
                    fontWeight="bold"
                    textAlign="center"
                    color={colorMode === "light" ? "white" : "black"}
                >
                    {data[0].answer} 😂🤣
                </Text>
            )}
        </Center>
    );
}
