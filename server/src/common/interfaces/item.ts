import {UploadedFile} from "./upload";

export type ItemStatus =  'STATUS1_HIDDEN' | 'STATUS2_ACTIVE' | 'STATUS3_ORDERED' | 'STATUS4_SHIPPED' | 'STATUS5_SOLD'
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
    orderId: number;
    contactEmail: string;
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

export interface BuyData {
    email: string;
    itemIds: number[]
}
