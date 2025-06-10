export interface RecentChanges {
    id: string;
    kind: string;
    timestamp: string;
    comment: string;
    author: {
        key: string;
    };
    changes: {
        key: string;
        revision: number;
    }[];
    data: {
        list?: {
            key: string;
        };
        seeds?: string[];
        add?: { key: string }[];
        remove?: { key: string }[];
        [key: string]: any;
    };
}
