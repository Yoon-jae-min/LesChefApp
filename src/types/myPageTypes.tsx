type StorageItemType = {
    name: string, 
    amount: string, 
    expire: string
}

export type SelectedListType = {
    place: string;
    items: StorageItemType[]
}