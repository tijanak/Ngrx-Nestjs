export interface IAuction {
  id: number;
  min_price: number;
  start_time: Date;
  end_time: Date;
  title: string;
  description: string;
  categories: IAuction_Category[];
  owner: IUser;
  images: IAuction_Image[];
  sale_certificate: ISale_Certificate | null;
}
export interface IUser {
  id: number;
  username: string;
  email: string;
  phone_number: string;
  auctions: IAuction[];
  bids: IBid[];
  certificatesBought: ISale_Certificate[];
  certificatesSold: ISale_Certificate[];
}
export interface IBid {
  time_created: Date;
  amount: number;
  bidder: IUser;
  auction: IAuction;
}
export interface ISale_Certificate {
  id: number;
  time_granted: Date;
  amount: number;
  winner: IUser;
  owner: IUser;
  images: IAuction_Image[];
  title: string;
  description: string;
}
export interface IAuction_Category {
  id: number;
  category_name: string;
  auctions: IAuction[];
}
export interface IAuction_Image {
  id: number;
  url: string;
}
