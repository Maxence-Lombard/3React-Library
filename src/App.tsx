import './App.css'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
import {BrowserRouter} from "react-router";
import {Router} from '@layouts/Router';
import {SearchProvider} from "@context/SearchContext.tsx";

const queryClient = new QueryClient()


function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools />
                <SearchProvider>
                    <BrowserRouter>
                        <Router />
                    </BrowserRouter>
                </SearchProvider>
            </QueryClientProvider>
        </>
    )
}

export default App
