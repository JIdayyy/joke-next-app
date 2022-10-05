import { Center, Spinner, Text, useColorMode } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { JokeWithUserRawSQL } from "src/service/API/joke/random";
import axiosInstance from "src/utils/axiosInstance";

export const getJoke = async (): Promise<JokeWithUserRawSQL> => {
    const res = await axiosInstance.get<JokeWithUserRawSQL>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/joke/random`,
    );
    return res.data;
};

interface IProps {
    showAnswer: boolean;
    setShowAnswer: Dispatch<SetStateAction<boolean>>;
    data?: JokeWithUserRawSQL;
    isLoading: boolean;
}

export default function JokeCard({
    showAnswer,
    data,
    isLoading,
}: IProps): JSX.Element {
    const { colorMode } = useColorMode();

    if (!data) {
        return <Spinner />;
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
                color={colorMode === "light" ? "white" : "black"}
                textAlign="center"
            >
                {data[0].content}
            </Text>

            {showAnswer && (
                <>
                    <Text
                        fontSize={[12, 17, 25]}
                        fontWeight="bold"
                        textAlign="center"
                        color={colorMode === "light" ? "white" : "black"}
                    >
                        {data[0].answer} 😂🤣
                    </Text>
                    <Text
                        fontWeight="medium"
                        color={colorMode === "light" ? "white" : "black"}
                        fontSize={[12, 12, 12]}
                    >
                        ( merci à {data[0].user.userName} )
                    </Text>
                </>
            )}
        </Center>
    );
}
