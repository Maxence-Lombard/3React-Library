import defaultClass from './BookCard.module.css';
import type {Doc} from "@models/searchBooks.ts";
import imagePlaceHolder from "@assets/imagePlaceHolder.svg";
import {useNavigate} from "react-router";
import Skeleton from "react-loading-skeleton";

interface BookCardProps {
    doc: Doc | null;
}

function BookCard ({doc}: BookCardProps) {
    const navigate = useNavigate();

    if (!doc) {
        return (
            <div className={ defaultClass.container }>
                <Skeleton className={ defaultClass.imageSkeleton } />
                <p><Skeleton /></p>
                <div className={ defaultClass.bottomCard }>
                    <p><Skeleton /></p>
                    <p><Skeleton /></p>
                </div>
            </div>
        );
    }

    const title = doc?.title ?? "Unknown Title";
    const author = doc?.author_name?.[0] ?? "Unknown Author";
    const date = doc?.first_publish_year ?? doc?.publish_year?.[0] ?? "Unknown";
    const url = doc?.cover_i
        ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
        : null;

    const workId = doc.key?.split("/").pop();

    const handleClick = () => {
        if (workId) {
            console.log(`Navigating to book details for work ID: ${workId}`);
            navigate(`/book/${workId}/details`);
        }
    };

    return (
        <button type="button" onClick={handleClick} className={ defaultClass.container }>
            { url ? (
                <img src={url} alt={title} className={ defaultClass.image }/>
            ) : <img src={imagePlaceHolder}  alt={"no image available"} className={ defaultClass.image }/>}
            <p className={defaultClass.title}> { title } </p>
            <div className={ defaultClass.bottomCard }>
                <p className={ defaultClass.author }> by { author } </p>
                <p> { date } </p>
            </div>
        </button>
    )
}

export default BookCard;