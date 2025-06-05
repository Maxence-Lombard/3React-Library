import defaultClass from './BookListing.module.css';
import {useEffect} from "react";
import {useSearch} from "@context/SearchContext.tsx";
import BookCard from "@components/bookCard/BookCard.tsx";
import noDataAnimation from "@assets/lottie/empty.json";
import Lottie from "lottie-react";

function BookListing() {
    const { data, isLoading, isError, setSearchType } = useSearch()
    console.log("Rendu BookListing, data:", data);
    useEffect(() => {
        if (data && data.docs.length > 0) {
            console.log("Search Results:", data);
        }
    }, [data]);

    return(
        <div>
            <div className={defaultClass.head}>
                <h2 className={defaultClass.h2}> BOOK LISTING </h2>
            </div>
                { data ? (
                    data.docs.length === 0 ? (
                        <div className={defaultClass.noDataDiv}>
                            <div className={defaultClass.textContainer}>
                                <p> No results found for: </p>
                                <h3 className={defaultClass.h2}> { data ? data.q : '...' } </h3>
                            </div>
                            <Lottie
                                animationData={noDataAnimation}
                            />
                        </div>
                    ) : (
                        <div className={defaultClass.bookCardGrid}>
                            {data.docs.map((book: any) => (
                                <BookCard key={book.key} doc={book} isLoading={isLoading}/>
                            ))}
                        </div>
                    )
                ) : <h3 className={defaultClass.h2}> Start by searching a book </h3> }
        </div>
    );
}

export default BookListing;