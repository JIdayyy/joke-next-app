import React, { useEffect, useState } from "react";
import {
    Button,
    Center,
    Flex,
    Select,
    Text,
    useColorMode,
} from "@chakra-ui/react";
import JokeCard, { getJoke } from "@components/JokeCard";
import { useQuery } from "react-query";
import MainLayout from "@components/Layouts/MainLayout";
import CreateJokeModal, {
    getCategories,
} from "@components/Modal/CreateJokeModal";

function Home(): JSX.Element {
    const [showAnswer, setShowAnswer] = useState(false);
    const [category, setCategory] = useState("all");
    const { data: categories } = useQuery(["categories"], getCategories);
    const { data, isLoading, refetch, isRefetching } = useQuery(
        ["joke"],
        () => getJoke(category),
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
            as="main"
            justifyContent="space-around"
            flexDirection="column"
            minH="100vh"
            minW="full"
        >
            <Text as="h1" fontSize={[20, 25, 30]} fontWeight="bold">
                Wanna have fun for a minute ? 😁
            </Text>

            <Select
                onChange={(e) => setCategory(e.target.value)}
                w={["95%", "85%", "70%", "50%"]}
            >
                <option value="all">All</option>
                {categories?.map((category) => (
                    <option value={category.id}>{category.name}</option>
                ))}
            </Select>

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
            <Flex>
                <Text>Made with ❤️ and ☕️ by</Text>
                <a href="https://github.com/JIdayyy" target="_blank">
                    <Text ml={1} cursor="pointer" color={"blue.400"}>
                        Jidayyy
                    </Text>
                </a>
            </Flex>
        </Center>
    );
}

Home.Layout = MainLayout;

export default Home;
