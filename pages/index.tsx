import React, { useEffect, useState } from "react";
import { Button, Center, Flex, Text, useColorMode } from "@chakra-ui/react";
import JokeCard from "@components/JokeCard";
import { useQueryClient } from "react-query";

const Home: React.FC = () => {
    const [showAnswer, setShowAnswer] = useState(false);
    const client = useQueryClient();

    const { setColorMode, colorMode } = useColorMode();

    useEffect(() => {
        if (colorMode !== "dark") {
            setColorMode("dark");
        }
    }, []);

    const handleShowAnswer = () => {
        setShowAnswer(true);
    };

    const handleNextJoke = () => {
        client.invalidateQueries("joke");
    };

    return (
        <Center
            justifyContent="space-around"
            flexDirection="column"
            minH="100vh"
            minW="full"
        >
            <Text fontSize={30} fontWeight="bold">
                Wanna have fun for a minute ? 😁
            </Text>

            <JokeCard showAnswer={showAnswer} setShowAnswer={setShowAnswer} />
            <Flex justifyContent="space-between" w={["90%", "70%", "50%"]}>
                <Button onClick={handleNextJoke} colorScheme="blue" my={2}>
                    Get a new joke 😂
                </Button>
                <Button onClick={handleShowAnswer} colorScheme="green" my={2}>
                    Show Answer 😁
                </Button>
            </Flex>
        </Center>
    );
};

export default Home;
