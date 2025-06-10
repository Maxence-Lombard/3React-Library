import defaultClass from './LastUpdatesListing.module.css';
import Lottie from "lottie-react";
import noDataAnimation from "@assets/lottie/empty.json";
import {useEffect, useState} from "react";
import type {RecentChanges} from "@models/recentChanges.ts";
import Skeleton from "react-loading-skeleton";

function LastUpdatesListing() {
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [displayedLastInfos, setDisplayedLastInfos] = useState<RecentChanges[]>([]);
    const limit = 20;

    const fetchRecentChanges = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`https://openlibrary.org/recentchanges.json?limit=${limit}&page=${page}`);
            if (!res.ok) throw new Error("Erreur lors de la récupération des données");
            const data: RecentChanges[] = await res.json();

            setDisplayedLastInfos(prev => page === 1 ? data : [...prev, ...data]);

            if (data.length < limit) {
                setHasMore(false);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRecentChanges();
    }, [page]);

    return (
        <div>
            <h2 className={defaultClass.h2}>Last Updates</h2>
            {isLoading && (
                <div className={defaultClass.gridContainer}>
                    {Array.from({ length: limit }).map((_, index) => (
                        <Skeleton key={index} className={defaultClass.skeleton} />
                    ))}
                </div>
            )}

            {!isLoading && displayedLastInfos.length === 0 && (
                <div className={defaultClass.noDataDiv}>
                    <div className={defaultClass.textContainer}>
                        <p>No recent updates found.</p>
                    </div>
                    <Lottie animationData={noDataAnimation} />
                </div>
            )}

            <div className={defaultClass.gridContainer}>
                {displayedLastInfos.map((change) => (
                    <div key={change.id} className={defaultClass.card}>
                        <div className={defaultClass.cardTop}>
                            <p> {change.author?.key.replace('/people/', '') || "Unknown"}</p>
                            <p> { change.kind } </p>
                        </div>
                        <div className={defaultClass.cardContent}>
                            <p className={defaultClass.sectionTitle}> Change: </p>
                            <p>{change.comment || "No comment"}</p>
                            <p>{change.changes[0].key || "No change key"}</p>
                        </div>
                        <div className={defaultClass.cardContent}>
                            <p className={defaultClass.sectionTitle}> Date: </p>
                            <p>
                                {change.timestamp
                                    ? new Date(change.timestamp).toLocaleString('en-GB', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit'
                                    })
                                    : "No date"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {hasMore && (
                <div className={defaultClass.buttonContainer}>
                    <button
                        type="button"
                        className={defaultClass.loadMoreButton}
                        onClick={() => setPage(p => p + 1)}
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
}

export default LastUpdatesListing;