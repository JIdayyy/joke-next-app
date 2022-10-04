import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";
import useUserContext from "src/context/UserContext";

export default function MainLayout({
    children,
}: {
    children: ReactNode;
}): JSX.Element {
    const router = useRouter();
    const userContext = useUserContext();

    useEffect(() => {
        if (!userContext || !userContext.user.id) {
            router.push("/auth/login");
        }
    }, [userContext]);

    return (
        <Flex w="full" h="full">
            {children}
        </Flex>
    );
}
