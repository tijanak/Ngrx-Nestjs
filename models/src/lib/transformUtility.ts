import { IAuction, IUser } from './models';

export const toIUser = ({
  id,
  email,
  name,
  surname,
  phone_number,
  auctions,
  bids,
}: IUser): IUser => {
  return { id, email, name, surname, phone_number, auctions, bids };
};
