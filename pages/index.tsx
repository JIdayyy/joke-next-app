import React, { useEffect, useState } from "react";
import { Button, Center, Flex, Text, useColorMode } from "@chakra-ui/react";
import JokeCard, { getJoke } from "@components/JokeCard";
import { useQuery } from "react-query";
import { NextSeo } from "next-seo";
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
            <NextSeo
                title="Next joke API"
                description="This example of Next.js with React Query and Chakra UI"
                canonical="https://joke-next-app.vercel.app/"
                openGraph={{
                    url: "https://joke-next-app.vercel.app/",
                    title: "Next Joke App",
                    description: "Super Joke app",
                    images: [
                        {
                            url: "https://www.example.ie/og-image-01.jpg",
                            width: 800,
                            height: 600,
                            alt: "Og Image Alt",
                            type: "image/jpeg",
                        },
                        {
                            url: "https://www.example.ie/og-image-02.jpg",
                            width: 900,
                            height: 800,
                            alt: "Og Image Alt Second",
                            type: "image/jpeg",
                        },
                        { url: "https://www.example.ie/og-image-03.jpg" },
                        { url: "https://www.example.ie/og-image-04.jpg" },
                    ],
                    site_name: "Next Joke App",
                }}
                twitter={{
                    handle: "@handle",
                    site: "@site",
                    cardType: "summary_large_image",
                }}
            />
            <Text fontSize={[20, 25, 30]} fontWeight="bold">
                Wanna have fun for a minute ? 😁
            </Text>

            <JokeCard
                isLoading={isLoading}
                data={data || []}
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
