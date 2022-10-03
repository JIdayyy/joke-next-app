import { Center, Spinner, Text, useColorMode } from "@chakra-ui/react";
import axios from "axios";
import React, { Dispatch, SetStateAction } from "react";
import { useQuery } from "react-query";

interface IJoke {
    punchline: string;
    question: string;
}

const getJoke = async () => {
    const res = await axios.get<IJoke[]>(
        "https://backend-omega-seven.vercel.app/api/getjoke",
    );
    return res.data;
};

interface IProps {
    showAnswer: boolean;
    setShowAnswer: Dispatch<SetStateAction<boolean>>;
}

export default function JokeCard({
    showAnswer,
    setShowAnswer,
}: IProps): JSX.Element {
    const { data, isLoading } = useQuery(["joke"], getJoke, {
        onSuccess: () => {
            setShowAnswer(false);
        },
    });

    const { colorMode } = useColorMode();

    if (!data) {
        return <Center>Error ...</Center>;
    }

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <Center
            justifyContent="space-between"
            bg={colorMode === "light" ? "#1A202C" : "white"}
            w={["95%", "80%", "50%"]}
            p={10}
            rounded="md"
            height="300px"
            flexDirection="column"
        >
            <Text
                fontWeight="bold"
                textAlign="center"
                color={colorMode === "light" ? "white" : "black"}
            >
                {data[0].question}
            </Text>

            {showAnswer && (
                <Text
                    fontSize={30}
                    fontWeight="bold"
                    textAlign="center"
                    color={colorMode === "light" ? "white" : "black"}
                >
                    {data[0].punchline} 😂🤣
                </Text>
            )}
        </Center>
    );
}
