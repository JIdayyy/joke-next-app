import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useState,
} from "react";

type User = {
    id: string;
    email: string;
    userName: string;
};

interface UserContext {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
}

const userContext = createContext<UserContext | null>(null);

export const UserContextProvider = ({
    children,
}: {
    children: ReactNode;
}): JSX.Element => {
    const [user, setUser] = useState<User>({
        id: "",
        email: "",
        userName: "",
    });

    return (
        <userContext.Provider value={{ user, setUser }}>
            {children}
        </userContext.Provider>
    );
};

const useUserContext = (): UserContext | null => {
    const context = useContext(userContext);
    if (!context) {
        throw new Error(
            "useUserContext must be used within a UserContextProvider",
        );
    }
    return context;
};

export default useUserContext;
