export interface IAuction {
  id: number;
  min_price: number;
  start_time: Date;
  end_time: Date;
  title: string;
  description: string;
  categories: IAuction_Category[];
  owner: IUser;
  images: IImage[];
  sale_certificate: ISale_Certificate | null;
  bids: IBid[];
}
export interface IUser {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone_number: string;
  auctions: IAuction[];
  bids: IBid[];
}
export interface IBid {
  id: number;
  time_created: Date;
  amount: number;
  bidder: IUser;
  auction: IAuction;
  sale_certificate: ISale_Certificate | null;
}
export interface ISale_Certificate {
  id: number;
  time_granted: Date;
  winning_bid: IBid;
  auction: IAuction;
}
export interface IAuction_Category {
  id: number;
  name: string;
  auctions: IAuction[];
}
export interface IImage {
  id: number;
  fileName: string;
  auction: IAuction;
}
