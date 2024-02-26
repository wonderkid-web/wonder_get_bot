export interface IPost {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface IPhoto {
  albumId: number;
  id: number;
  title: string;
  url: string | URL;
  thumbnailUrl: string | URL;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  addres: IAddres;
}

export interface IAddres {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IGeo;
}

export interface IGeo {
  lat: string | number;
  lng: string | number;
}

export interface IFetchURL {
  photos: string;
  posts: string;
  users: string;
  kucing: string;
}

export type TResponse = "posts" | "users" | "photos" | "kucing";

export interface IKucing {
  id: number;
  url: string;
  width: number;
  height: number;
}
