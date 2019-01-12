import {UploadedFile} from "./upload";

export interface Item {
    id: number;
    thumbnail: UploadedFile;
    images: URLSearchParams[];
    tags: string[];
    sex: string;
    size: string;
    sizeEstimated: boolean;
    description: string;
}
