export type FoodItem = {
  _id: string;
  name: string;
  imageUrl?: string;
  volume: number;
  unit: string;
  expirate: Date | string;
  daysUntilExpiry?: number;
  status?: 'expired' | 'urgent' | 'warning' | 'notice' | 'safe';
};

export type StoragePlace = {
  _id: string;
  name: string;
  foodList: FoodItem[];
};

export type FoodsListResponse = {
  error: false;
  sectionList: StoragePlace[];
  result?: boolean | string;
  same?: boolean;
  exist?: boolean;
};
