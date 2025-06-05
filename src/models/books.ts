export interface BookByIsbnResponse {
    [isbn: string]: {
        bib_key: string;
        info_url: string;
        preview: string;
        preview_url: string;
        thumbnail_url: string;
    };
}

export interface SearchBookResponse {
    numFound: number;
    start: number;
    numFoundExact: boolean;
    num_found: number,
    documentation_url: string,
    q: string,
    offset: number;
    docs: Doc[];
}

export interface Doc {
    key: string;
    type?: string;

    title: string;
    title_suggest?: string;
    title_sort?: string;
    subtitle?: string;
    full_title?: string;

    edition_key?: string[];
    edition_count?: number;

    publish_year?: number[];
    first_publish_year?: number;
    publish_date?: string[];

    publisher?: string[];
    publisher_facet?: string[];

    language?: string[];

    author_name?: string[];
    author_key?: string[];
    contributor?: string[];
    person?: string[];
    person_key?: string[];

    subject?: string[];
    subject_facet?: string[];
    subject_key?: string[];

    place?: string[];
    place_key?: string[];

    time?: string[];
    time_key?: string[];

    cover_i?: number;
    cover_edition_key?: string;

    isbn?: string[];
    isbn_10?: string[];
    isbn_13?: string[];

    lccn?: string[];
    oclc?: string[];
    ia?: string[];
    ia_collection?: string[];
    ia_collection_s?: string;

    lending_edition_s?: string;
    lending_identifier_s?: string;
    printdisabled_s?: string;
    public_scan_b?: boolean;

    ebook_access?: 'public' | 'borrowable' | 'no_ebook';
    has_fulltext?: boolean;
    availability?: {
        status: string;
        available_to_browse: boolean;
        available_to_borrow: boolean;
        available_to_waitlist: boolean;
        is_printdisabled: boolean;
        is_readable: boolean;
        is_lendable: boolean;
        is_previewable: boolean;
        identifier: string;
        isbn: string;
        oclc: string;
        openlibrary_work: string;
        openlibrary_edition: string;
    };

    score?: number;

    // Champs rares ou peu documentés
    publish_place?: string[];
    last_modified_i?: number;
    first_sentence?: string | { type: string; value: string };
    author_alternative_name?: string[];
    seed?: string[];
}