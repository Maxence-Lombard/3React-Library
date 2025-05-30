import {createContext, type ReactNode, useContext, useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";

interface SearchContextType {
    data: any;
    isLoading: boolean;
    isError: boolean;
    setSearch: (query: string) => void;
    setSearchType: (type: "default" | "title" | "author") => void;
}
interface SearchProviderProps {
    children: ReactNode;
}

const baseUrl = "https://openlibrary.org";
const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({children}: SearchProviderProps) => {
    const [query, setQuery] = useState("");
    const [searchType, setSearchType] = useState<"default" | "title" | "author">("default");
    const [enabled, setEnabled] = useState(false);

    const urlToFetch = query ? `${baseUrl}/search.json?${
        searchType === "title"
            ? `title:${query}`
            : searchType === "author"
            ? `author${query}`
            :`q=${query}`
    }` : "";

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["search", urlToFetch],
        queryFn: async () => {
            const res = await fetch(urlToFetch);
            if (!res.ok) throw new Error("Network response was not ok");
            return res.json();
        },
        enabled: enabled,
    });

    useEffect(() => {
        if (urlToFetch){
            setEnabled(true);
            refetch();
        }
    }, [urlToFetch]);

    const setSearch = (q: string) => {
        setQuery(q);
        setEnabled(false);
    }

    return (
        <SearchContext.Provider
            value={{
                data,
                isLoading,
                isError,
                setSearch,
                setSearchType,
            }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error("useSearch must be used within a SearchProvider");
    }
    return context;
}