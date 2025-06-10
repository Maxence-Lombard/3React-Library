import defaultClass from './LastUpdatesListing.module.css';
import Lottie from "lottie-react";
import noDataAnimation from "@assets/lottie/empty.json";
import {useState} from "react";
import type {RecentChanges} from "@models/recentChanges.ts";
import Skeleton from "react-loading-skeleton";
import {useQuery} from "@tanstack/react-query";

function LastUpdatesListing() {
    const [page, setPage] = useState(1);
    const limit = 20;

    const urlToFetch = `https://openlibrary.org/recentchanges.json?limit=${limit}&page=${page}`;

    const {
        data,
        isLoading,
    } = useQuery<RecentChanges[]>({
        queryKey: ['recentChanges', urlToFetch],
        queryFn: async () => {
            const res = await fetch(urlToFetch);
            if (!res.ok) throw new Error("Erreur lors de la récupération des données");
            return res.json();
        },
        // keepPreviousData: true,
    });

    const hasMore = data ? data.length === limit : false;

    return (
        <div>
            <h2 className={defaultClass.h2}>Last Updates</h2>
            {isLoading ? (
                <div className={defaultClass.gridContainer}>
                    {Array.from({ length: limit }).map((_, index) => (
                        <Skeleton key={index} className={defaultClass.skeleton} />
                    ))}
                </div>
            ): null}

            {!isLoading && data?.length === 0 || !data ? (
                <div className={defaultClass.noDataDiv}>
                    <div className={defaultClass.textContainer}>
                        <p>No recent updates found.</p>
                    </div>
                    <Lottie animationData={noDataAnimation} />
                </div>
            ): null}

            <div className={defaultClass.gridContainer}>
                {data?.map((change) => (
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

            {hasMore ? (
                <div className={defaultClass.buttonContainer}>
                    <button
                        type="button"
                        className={defaultClass.loadMoreButton}
                        onClick={() => setPage(p => p + 1)}
                    >
                        Load More
                    </button>
                </div>
            ): null}
        </div>
    );
}

export default LastUpdatesListing;