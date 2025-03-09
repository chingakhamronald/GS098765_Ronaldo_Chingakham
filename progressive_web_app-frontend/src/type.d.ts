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
