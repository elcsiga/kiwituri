export interface UploadedFile {
    filename: string;
    thumbnail: {
        id: string;
        size: number;
        url: string;
    },
    normal: {
        id: string;
        size: number;
        url: string;
    }
}
