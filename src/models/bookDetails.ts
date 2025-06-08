export interface BookDetails {
    title: string;
    covers?: number[];
    first_publish_date?: string;
    key: string;

    authors?: {
        author: {
            key: string;
        };
        type: {
            key: string;
        };
    }[];

    type: {
        key: string;
    };

    description?: string | {
        value: string;
        type?: string;
    };

    links?: {
        title: string;
        url: string;
        type: {
            key: string;
        };
    }[];

    series?: {
        work: string;
        name: string;
    };

    subject_places?: string[];
    subject_people?: string[];
    subject_times?: string[];
    subjects?: string[];

    excerpts?: {
        excerpt: string;
        comment?: string;
        author?: {
            key: string;
        };
    }[];

    identifiers?: {
        bookbrainz?: string[];
        wikidata?: string[];
        musicbrainz?: string[];
        [key: string]: string[] | undefined;
    };

    latest_revision?: number;
    revision?: number;

    created?: {
        type: string;
        value: string;
    };

    last_modified?: {
        type: string;
        value: string;
    };

    author: Author;
    wikipedia: Wikipedia | undefined;
    edition: EditionResponse;
}

export interface Author {
    bio?: string | { value: string };
    type: {
        key: string;
    };
    entity_type: string;
    title?: string;
    personal_name?: string;
    fuller_name?: string;
    source_records?: string[];
    key: string;
    links?: {
        title: string;
        url: string;
        type: {
            key: string;
        };
    }[];
    name: string;
    alternate_names?: string[];
    birth_date?: string;
    photos?: number[];
    remote_ids?: {
        viaf?: string;
        goodreads?: string;
        storygraph?: string;
        isni?: string;
        librarything?: string;
        amazon?: string;
        wikidata?: string;
    };
    latest_revision: number;
    revision: number;
    created: {
        type: string;
        value: string;
    };
    last_modified: {
        type: string;
        value: string;
    };
}


export interface Wikipedia {
    type: string;
    title: string;
    displaytitle: string;
    namespace: {
        id: number;
        text: string;
    };
    wikibase_item: string;
    titles: {
        canonical: string;
        normalized: string;
        display: string;
    };
    pageid: number;
    thumbnail?: {
        source: string;
        width: number;
        height: number;
    };
    originalimage?: {
        source: string;
        width: number;
        height: number;
    };
    lang: string;
    dir: string;
    revision: string;
    tid: string;
    timestamp: string;
    description?: string;
    description_source?: string;
    content_urls: {
        desktop: {
            page: string;
            revisions: string;
            edit: string;
            talk: string;
        };
        mobile: {
            page: string;
            revisions: string;
            edit: string;
            talk: string;
        };
    };
    extract?: string;
    extract_html?: string;
}

export interface EditionResponse {
    links: {
        self: string;
        work: string;
        next?: string;
    };
    size: number;
    entries: Edition[];
}

export interface Edition {
    type: {
        key: string;
    };
    key: string;
    title: string;
    subtitle?: string;
    by_statement?: string;
    edition_name?: string;

    authors?: {
        key: string;
    }[];

    works?: {
        key: string;
    }[];

    work_titles?: string[];
    publish_country?: string;
    publish_date?: string;
    publish_year?: number[];
    publishers?: string[];
    publish_places?: string[];

    number_of_pages?: number;
    pagination?: string;
    physical_format?: string;
    physical_dimensions?: string;
    weight?: string;

    table_of_contents?: {
        title?: string;
        label?: string;
        pagenum?: string;
        level?: number;
    }[];

    covers?: number[];

    languages?: {
        key: string;
    }[];

    identifiers?: {
        [type: string]: string[]; // e.g. isbn_10, lccn, oclc
    };

    isbn_10?: string[];
    isbn_13?: string[];
    lccn?: string[];
    oclc?: string[];

    classifications?: {
        dewey_decimal_class?: string[];
        lc_classifications?: string[];
    };

    subjects?: string[];
    subject_places?: string[];
    subject_people?: string[];
    subject_times?: string[];

    series?: string[];
    contributions?: string[];

    source_records?: string[];
    latest_revision: number;
    revision: number;

    created: {
        type: string;
        value: string;
    };

    last_modified: {
        type: string;
        value: string;
    };
}
