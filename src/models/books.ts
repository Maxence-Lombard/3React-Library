export interface BookByIsbnResponse {
    [isbn: string]: {
        bib_key: string;
        info_url: string;
        preview: string;
        preview_url: string;
        thumbnail_url: string;
    };
}