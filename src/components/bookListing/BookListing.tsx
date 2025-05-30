import {useEffect} from "react";
import {useSearch} from "../../context/SearchContext.tsx";

function BookListing() {
    const { data, isLoading, isError, setSearchType } = useSearch()
    console.log("Rendu BookListing, data:", data);
    useEffect(() => {
        if (data && data.length > 0) {
            console.log("Search Results:", data);
        }
    }, [data]);

    return(
        <div>
            BOOK LISTING
        </div>
    );
}

export default BookListing;