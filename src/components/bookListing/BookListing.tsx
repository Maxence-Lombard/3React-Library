import defaultClass from './BookListing.module.css';
import {useEffect, useState} from "react";
import {useSearch} from "@context/SearchContext.tsx";
import BookCard from "@components/bookCard/BookCard.tsx";
import noDataAnimation from "@assets/lottie/empty.json";
import Lottie from "lottie-react";
import {useDebounce} from "use-debounce";
import type {Doc} from "@models/searchBooks.ts";

function BookListing() {
    const { data, isLoading, isError, query, setSearchParams, limit, setPage, page } = useSearch()
    const [displayedBooks, setDisplayedBooks] = useState<Doc[]>([]);
    const [hasMore, setHasMore] = useState(true);

    const [authorFilter, setAuthorFilter] = useState("");
    const [yearFilter, setYearFilter] = useState("");
    const [publisherFilter, setPublisherFilter] = useState("");
    const [personFilter, setPersonFilter] = useState("");

    const [debouncedAuthor] = useDebounce(authorFilter, 500);
    const [debouncedYear] = useDebounce(yearFilter, 500);
    const [debouncedPublisher] = useDebounce(publisherFilter, 500);
    const [debouncedPerson] = useDebounce(personFilter, 500);

    useEffect(() => {
        if (data && data.docs.length < limit) {
            setHasMore(false);
        } else {
            setHasMore(true);
        }
    }, [data]);

    useEffect(() => {
        setDisplayedBooks([]);
        setPage(1);
        setSearchParams({
            author: debouncedAuthor,
            first_publish_year: debouncedYear,
            publisher: debouncedPublisher,
            person: debouncedPerson,
        });
    }, [debouncedAuthor, debouncedYear, debouncedPublisher, debouncedPerson]);

    useEffect(() => {
        if (data && data.docs) {
            setDisplayedBooks(prev =>
                page === 1 ? data.docs : [...prev, ...data.docs]
            );
        }
    }, [data, page]);

    return(
        <div>
            <div className={defaultClass.filterContainer}>
                <input
                    className={defaultClass.input}
                    type="text"
                    name="author"
                    id="author"
                    placeholder='Author'
                    value={authorFilter}
                    onChange={(e) => setAuthorFilter(e.target.value)}
                />
                <input
                    className={defaultClass.input}
                    type="number"
                    name="releaseYear"
                    id="realeaseYear"
                    placeholder='Release Year'
                    value={yearFilter}
                    onChange={(e) => setYearFilter(e.target.value)}
                />
                <input
                    className={defaultClass.input}
                    type="text"
                    name="publisher"
                    id="publisher"
                    placeholder='Publisher'
                    value={publisherFilter}
                    onChange={(e) => setPublisherFilter(e.target.value)}
                />
                <input
                    className={defaultClass.input}
                    type="text"
                    name="person"
                    id="person"
                    placeholder='Person'
                    value={personFilter}
                    onChange={(e) => setPersonFilter(e.target.value)}
                />
            </div>
            <div className={defaultClass.head}>
                <h2 className={defaultClass.h2}> BOOK LISTING </h2>
            </div>
            {!query ? null :  isLoading && displayedBooks.length === 0 ? (
                <div className={defaultClass.bookCardGrid}>
                    {Array.from({ length: limit }).map((_, i) => (
                        <BookCard key={i} doc={null} />
                    ))}
                </div>
            ) : displayedBooks.length === 0 ? (
                <div className={defaultClass.noDataDiv}>
                    <div className={defaultClass.textContainer}>
                        <p>No results found for:</p>
                        <h3 className={defaultClass.h2}>{data ? data.q : '...'}</h3>
                    </div>
                    <Lottie animationData={noDataAnimation} />
                </div>
            ) : (
                <div className={defaultClass.bookCardGrid}>
                    {displayedBooks.map((book: any) => (
                        <BookCard key={book.key} doc={book} />
                    ))}
                </div>
            )}
            {displayedBooks.length !== 0 && hasMore ? (
                <div className={defaultClass.buttonContainer}>
                    <button type="button" className={defaultClass.loadMoreButton}
                            onClick={() => setPage(page + 1)}>
                        {hasMore ? "Load More" : null}
                    </button>
                </div>
            ) : null }
        </div>
    );
}

export default BookListing;