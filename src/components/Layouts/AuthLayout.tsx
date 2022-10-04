import { Center, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { useMutation } from "react-query";
import useUserContext from "src/context/UserContext";
import axiosInstance from "src/utils/axiosInstance";

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps): JSX.Element {
    const userContext = useUserContext();
    const router = useRouter();
    const [isAuthChecking, setIsAuthChecking] = useState(true);
    const { mutate, isLoading } = useMutation(
        (data) => axiosInstance.post("/auth/me", data),
        {
            onSuccess: (data) => {
                const { authorization } = data.headers;
                axiosInstance.defaults.headers["Authorization"] = authorization;
                localStorage.setItem("token", authorization);
                userContext?.setUser(data.data);
                router.push("/");
            },
            onError: () => {
                setIsAuthChecking(false);
            },
        },
    );

    useEffect(() => {
        mutate();
    }, []);

    return (
        <Center w="full" h="full">
            {isLoading || isAuthChecking ? <Spinner /> : children}
        </Center>
    );
}
