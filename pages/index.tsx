import React, { useEffect, useState } from "react";
import { Button, Center, Flex, Text, useColorMode } from "@chakra-ui/react";
import JokeCard, { getJoke } from "@components/JokeCard";
import { useQuery } from "react-query";
import MainLayout from "@components/Layouts/MainLayout";
import CreateJokeModal from "@components/Modal/CreateJokeModal";

function Home(): JSX.Element {
    const [showAnswer, setShowAnswer] = useState(false);
    const { data, isLoading, refetch, isRefetching } = useQuery(
        ["joke"],
        getJoke,
        {
            onSuccess: () => {
                setShowAnswer(false);
            },
        },
    );

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
        refetch();
    };

    return (
        <Center
            justifyContent="space-around"
            flexDirection="column"
            minH="100vh"
            minW="full"
        >
            <Text fontSize={[20, 25, 30]} fontWeight="bold">
                Wanna have fun for a minute ? 😁
            </Text>

            <JokeCard
                isLoading={isLoading}
                data={data}
                showAnswer={showAnswer}
                setShowAnswer={setShowAnswer}
            />
            <Flex justifyContent="space-between" w={["90%", "70%", "50%"]}>
                <Button
                    isLoading={isLoading || isRefetching}
                    onClick={handleNextJoke}
                    colorScheme="blue"
                    my={2}
                >
                    Get a new joke 😂
                </Button>
                <Button onClick={handleShowAnswer} colorScheme="green" my={2}>
                    Show Answer 😁
                </Button>
            </Flex>
            <CreateJokeModal />
        </Center>
    );
}

Home.Layout = MainLayout;

export default Home;
