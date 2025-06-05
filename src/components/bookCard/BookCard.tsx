import defaultClass from './BookCard.module.css';
import Skeleton from "react-loading-skeleton";
import type {Doc} from "@models/books.ts";
import imagePlaceHolder from "@assets/imagePlaceHolder.svg";

interface BookCardProps {
    doc: Doc;
    isLoading: boolean;
}

function BookCard ({doc, isLoading}: BookCardProps) {
    const title = doc.title ?? "Titre inconnu";
    const author = doc.author_name?.[0] ?? "Auteur inconnu";
    const date = doc.first_publish_year ?? doc.publish_year?.[0] ?? "Date inconnue";
    const url = doc.cover_i
        ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
        : null;

    // Récupérer + d'infos
    // const workKey = doc.key; // ex: "/works/OL31711215W"
    // const workId = workKey.split("/").pop(); // "OL31711215W"
    // const url = `https://openlibrary.org/works/${workId}.json`;
    // const res = await fetch(`https://openlibrary.org/works/${workId}.json`);
    // const workData = await res.json();

    if (isLoading) {
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

    return (
        <button className={ defaultClass.container }>
            { url ? (
                <img src={url} alt={title} className={ defaultClass.image }/>
            ) : <img src={imagePlaceHolder}  alt={"no image available"}/>}
            <p> { title } </p>
            <div className={ defaultClass.bottomCard }>
                <p> by { author } </p>
                <p> { date } </p>
            </div>
        </button>
    )
}

export default BookCard;