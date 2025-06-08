import {createContext, type ReactNode, useContext, useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import type {SearchBookResponse} from "@models/searchBooks.ts";

interface Filters {
    title?: string;
    author?: string;
    publisher?: string;
    first_publish_year?: string;
    person?: string;
}

interface SearchContextType {
    data: SearchBookResponse;
    isLoading: boolean;
    isError: boolean;
    query: string;
    setSearch: (query: string) => void;
    setSearchParams: (filters: Filters) => void;
    limit: number;
    page: number;
    setPage: (page: number) => void;
}
interface SearchProviderProps {
    children: ReactNode;
}

const baseUrl = "https://openlibrary.org";
const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({children}: SearchProviderProps) => {
    const [query, setQuery] = useState("");
    const [filters, setFilters] = useState<Filters>({});
    const [enabled, setEnabled] = useState(false);
    const [page, setPage] = useState(1);
    const limit = 15;

    const filterString = Object.entries(filters)
        .filter(([key, value]) => value !== "" && key !== "title")
        .map(([key, value]) => `${key}=${encodeURIComponent(value ?? "")}`)
        .join("&");

    const urlToFetch = query
        ? `${baseUrl}/search.json?q=${encodeURIComponent(query)}${filterString ? "&" + filterString : ""}&limit=${limit}&page=${page}`
        : filterString
            ? `${baseUrl}/search.json?${filterString}&limit=${limit}&page=${page}`
            : "";

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
    }, [urlToFetch, page]);

    const setSearch = (q: string) => {
        setQuery(q);
        setPage(1);
        setEnabled(false);
    };

    const setSearchParams = (newFilters: Filters) => {
        setPage(1);
        setFilters(newFilters);
        setEnabled(false);
    };

    return (
        <SearchContext.Provider
            value={{
                data,
                isLoading,
                isError,
                query,
                setSearch,
                setSearchParams,
                limit,
                page,
                setPage,
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