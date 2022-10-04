/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from "react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@definitions/chakra/theme";
import "@styles/global.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { UserContextProvider } from "src/context/UserContext";

const Noop = ({ children }: { children: ReactNode }) => <>{children}</>;

function MyApp({ Component, pageProps }: AppProps<any>): JSX.Element {
    const queryClient = new QueryClient();

    const Layout = (Component as any).Layout || Noop;

    return (
        <ChakraProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <UserContextProvider>
                        <Layout pageProps={pageProps}>
                            <Component {...pageProps} />
                        </Layout>
                    </UserContextProvider>
                </Hydrate>
            </QueryClientProvider>
        </ChakraProvider>
    );
}

export default MyApp;
