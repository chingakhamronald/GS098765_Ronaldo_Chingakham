export interface IListData {
  title: string;
  href: string;
}

export interface IStorePostData {
  state: string;
  storeName: string;
  city: string;
}

export interface IStore extends IStorePostData {
  id: string;
  storeId: string;
}

export interface ISkuPostData {
  price: string;
  cost: string;
}

export interface ISku extends ISkuPostData {
  id: string;
  uuid: string;
  skuName: string;
  class: string;
  department: string;
}
