import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import {BrowserRouter} from "react-router";
import { Router } from './layouts/Router';

const queryClient = new QueryClient()


function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools />
                <BrowserRouter>
                    <Router />
                </BrowserRouter>
            </QueryClientProvider>
        </>
    )
}

export default App
