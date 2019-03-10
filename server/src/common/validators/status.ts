import {ItemRecord, ItemStatus} from "../interfaces/item";


export function allowChangeStatus(item: ItemRecord, status: ItemStatus) {
    if (status === item.status)
        return false;
    if (status === 'STATUS2_ACTIVE' && !item.status)
        return false;
    if (item.order)
        return true;
    else
        return !hasOrder(status);
}

export function hasOrder(status: ItemStatus) {
    return status === 'STATUS3_ORDERED' || status === 'STATUS4_SHIPPED' || status === 'STATUS5_SOLD';
}
