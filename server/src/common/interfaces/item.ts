import {UploadedFile} from "./upload";

export type ItemStatus = 'incactive' | 'active' | 'sold';
export type UserId = string; //email

export interface TimeStampData {
    timestamp: number;
    userId: UserId;
}

export interface ItemBody {
    thumbnail: UploadedFile;
    images: UploadedFile[];
    category: string;
    tags: string[];
    sex: string;
    size: string;
    sizeEstimated: boolean;
    description: string;
    status: ItemStatus;
    store: UserId;
    created: TimeStampData;
    updated: TimeStampData;
}

export interface ItemRecord {
    id: number;
    data: ItemBody;
}

export interface DbItemRecord {
    id: number;
    data: string;
}

export const fromDb: (string) => ItemBody = dbItemBody => {
    try {
        return JSON.parse(dbItemBody);
    } catch (e) {
        return null;
    }
};

export const toDb: (ItemBodys) => string = itemBody => {
    try {
        return JSON.stringify(itemBody);
    } catch (e) {
        return null;
    }
};
