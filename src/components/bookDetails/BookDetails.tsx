import {useParams} from "react-router";
import {useEffect, useState} from "react";
import type {Author, BookDetails, EditionResponse, Wikipedia} from "@models/bookDetails.ts";
import defaultClass from "./BookDetails.module.css";
import imagePlaceHolder from "@assets/imagePlaceHolder.svg";
import Skeleton from "react-loading-skeleton";

function BookDetails() {
    const { id } = useParams();
    const [book, setBook] = useState<BookDetails | undefined>(undefined);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [wikipediaLink, setWikipediaLink] = useState<string | undefined>(undefined);
    const [authorWikipediaInfos, setAuthorWikipediaInfos] = useState<Wikipedia | undefined>(undefined);

    async function fetchAuthorImage(authorName: string): Promise<Wikipedia | undefined> {
        try {
            const searchRes = await fetch(
                `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(authorName)}&format=json&origin=*`
            );
            const searchData = await searchRes.json();
            const pageTitle = searchData?.query?.search?.[0]?.title;

            if (!pageTitle) return undefined;

            const summaryRes = await fetch(
                `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pageTitle)}`
            );
            return await summaryRes.json()
        } catch (e) {
            console.error("Failed to fetch author image from Wikipedia:", e);
            return undefined;
        }
    }


    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const workRes = await fetch(`https://openlibrary.org/works/${id}.json`);
                const workData: BookDetails = await workRes.json();
                setWikipediaLink(workData.links?.find(link => link.url.includes("wikipedia"))?.url);
                const wikiUrl = workData.links?.find(link => link.url.includes("wikipedia"))?.url;
                let wikipediaData: Wikipedia | undefined = undefined;

                if (wikiUrl) {
                    const title = decodeURIComponent(wikiUrl.split("/").pop()!);
                    const wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`);
                    wikipediaData = await wikiRes.json();
                }

                const authorKey = workData.authors?.[0]?.author?.key;
                const authorData: Author = authorKey
                    ? await (await fetch(`https://openlibrary.org${authorKey}.json`)).json()
                    : null;

                const editionsRes = await fetch(`https://openlibrary.org/works/${id}/editions.json?limit=1`);
                const editionsData: EditionResponse = await editionsRes.json();

                setBook({
                    ...workData,
                    author: authorData,
                    wikipedia: wikipediaData,
                    edition: editionsData
                });
                console.log("Fetched book details:", book);
            } catch (e) {
                console.error("Failed to fetch book details", e);
            }
        };
        fetchDetails();
    }, [id]);

    useEffect(() => {
        if (book?.author?.fuller_name || book?.author?.name) {
            fetchAuthorImage(book.author.fuller_name || book.author.name ).then(infos => {
                setAuthorWikipediaInfos(infos);
            });
        }
    }, [book?.author]);

    function cleanDescription(raw?: string): string | undefined {
        if (!raw) return undefined;

        const marker = "----------";
        const index = raw.indexOf(marker);

        if (index !== -1) {
            return raw.slice(0, index).trim();
        }

        return raw.trim();
    }

    function cleanAuthorDescription(raw?: string): string | undefined {
        if (!raw) return undefined;

        const marker = "([Source][1])";
        const index = raw.indexOf(marker);

        if (index !== -1) {
            return raw.slice(0, index).trim();
        }

        return raw.trim();
    }


    if (!book) return <p>Book not found.</p>;
    console.log("Book details:", book);
    return (
        <div className={defaultClass.mainContainer}>
            <div className={defaultClass.container}>
                <img src={
                    book.wikipedia?.originalimage?.source
                    || book.wikipedia?.thumbnail?.source
                    || imagePlaceHolder}
                     alt={book.title}
                     className={defaultClass.coverImage}
                />
                <div className={defaultClass.details}>
                    <h1 className={defaultClass.title}>{book.title}</h1>
                    <div className={defaultClass.stars}>★★★☆☆</div>

                    <p className={defaultClass.description}>{cleanDescription(typeof book.description === "string"
                        ? book.description
                        : book.description?.value)}</p>

                    <div className={defaultClass.section}>
                        <ul className={defaultClass.littleSection}>
                            <li className={defaultClass.li}>
                                <p className={defaultClass.subTitle}>Publisher :</p>
                                {
                                    book.edition.entries[0].publishers
                                    ?? "Unknown"
                                }</li>
                            <li className={defaultClass.li}>
                                <p className={defaultClass.subTitle}>Publish date :</p>
                                {
                                    book.edition.entries[0].publish_year
                                    ?? book.edition.entries[0].publish_date
                                    ?? "Unknown"
                                }</li>
                            <li className={defaultClass.li}>
                                <p className={defaultClass.subTitle}>Language :</p>
                                {
                                    book.edition.entries[0].languages?.[0]?.key?.split("/").pop()?.toUpperCase()
                                    ?? book.wikipedia?.lang
                                    ?? "Unknown"
                                }
                            </li>
                            <li className={defaultClass.li}>
                                <p className={defaultClass.subTitle}>ISBN :</p>
                                {
                                    book.edition.entries[0].isbn_13
                                    ?? book.edition.entries[0].isbn_10
                                    ?? "Unknown"
                                }
                            </li>
                            <li className={defaultClass.li}>
                                <p className={defaultClass.subTitle}>Pages :</p>
                                {
                                    book.edition.entries[0].number_of_pages
                                    ?? "Unknown"
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={defaultClass.subContainer}>
                <div className={defaultClass.card}>
                    <div className={defaultClass.littleSection}>
                        <h2 className={defaultClass.subTitle}> Subjects </h2>
                        <div className={defaultClass.pinGrid}>
                            {book.subjects?.slice(0, 10).map((subject, idx) => (
                                <span key={idx} className={defaultClass.genre}>{subject}</span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={defaultClass.card}>
                    <div className={defaultClass.littleSection}>
                        <h2 className={defaultClass.subTitle}> Characters </h2>
                        <div className={defaultClass.pinGrid}>
                            {book.subject_people?.slice(0, 20).map((subject, idx) => (
                                <span key={idx} className={defaultClass.genre}>{subject}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className={defaultClass.card}>
                <div className={defaultClass.subContainer}>
                    {!authorWikipediaInfos?.originalimage?.source && !authorWikipediaInfos?.thumbnail?.source ? (
                        <Skeleton className={defaultClass.imageSkeleton} height={200} width={'auto'} />
                    ) : (
                        <img
                            src={
                                authorWikipediaInfos?.originalimage?.source
                                || authorWikipediaInfos?.thumbnail?.source
                            }
                            alt={book.author.name}
                            className={defaultClass.authorImage}
                        />
                    )}
                    <div className={defaultClass.sectionGap24Col}>
                        <div className={defaultClass.littleSection}>
                            <div className={defaultClass.sectionGap16RowCenter}>
                                <h2 className={defaultClass.subTitle}> { book.author.name } </h2>
                                <p> { book.author.birth_date } </p>
                            </div>
                            <p> { cleanAuthorDescription(typeof book.author.bio === "string"
                                ? book.author.bio
                                : book.author.bio?.value)} </p>
                        </div>
                        { book.author.links ? (
                            <div className={defaultClass.littleSection}>
                                <h2 className={defaultClass.subTitle}> Author links </h2>
                                <div className={defaultClass.pinGrid}>
                                    <a className={defaultClass.wikiLink}
                                       href={book.author.links[0].url}
                                       target="_blank"
                                       rel="noopener noreferrer"
                                    >
                                        { book.author.links[0].url }
                                    </a>
                                    <a className={defaultClass.wikiLink} href={authorWikipediaInfos?.content_urls.desktop.page}>
                                        { authorWikipediaInfos?.content_urls.desktop.page }
                                    </a>
                                </div>
                            </div>
                        ) : null }
                    </div>
                </div>
            </div>
            <div className={defaultClass.card}>
                <div className={defaultClass.littleSection}>
                    <h2 className={defaultClass.subTitle}> Wikipedia description </h2>
                    <p> { book.wikipedia?.extract } </p>
                </div>
                <div className={defaultClass.littleSection}>
                    <h2 className={defaultClass.subTitle}> Book link </h2>
                    <a className={defaultClass.wikiLink} href={wikipediaLink}>
                        {wikipediaLink}
                    </a>
                </div>

            </div>
        </div>
    );
}

export default BookDetails;