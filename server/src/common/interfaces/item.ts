import {UploadedFile} from "./upload";

export type ItemStatus =  'STATUS1_HIDDEN' | 'STATUS2_ACTIVE' | 'STATUS3_ORDERED' | 'STATUS4_SHIPPED'
    | 'STATUS5_SOLD' | 'STATUS6_LOST'

export type UserId = string; //email

export interface TimeStampData {
    timestamp: number;
    userId: UserId;
}

export interface ItemOrder {
    id: number
    email: string;
    date: number;
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
    store: UserId;
}

export interface ItemRecord {
    id: number;
    data: ItemBody;
    status: ItemStatus;
    order: ItemOrder;
}

export interface DbItemRecord {
    id: number;
    data: string;
}

export const fromDbItemRecord: (DbItemRecord) => ItemRecord = dbItemRecord => {
    return {
        id: dbItemRecord.id,
        data: fromDb<ItemBody>(dbItemRecord.data),
        status: dbItemRecord.status,
        order: fromDb<ItemOrder>(dbItemRecord.order)
    }
};


export const fromDb: <T>(string) => T = dbItemBody => {
    try {
        return JSON.parse(dbItemBody);
    } catch (e) {
        return null;
    }
};

export const toDb: <T>(T) => string = itemBody => {
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
