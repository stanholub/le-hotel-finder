export enum AvailabilityStatusEnum {
    "available",
    "onRequest",
    "soldOut",
    "error"
}

export type AvailabilityStatus = keyof typeof AvailabilityStatusEnum

export type Price = {
  currencyCode: string;
  value: number;
};

export type RoomResponse = {
  id: number;
  name: string;
  price: Price;
};

export type Room = {
  id: number;
  name: string;
  price: Price;
  actualPrice: Price;
  availabilityStatus: AvailabilityStatus;
};

export type AvailabilityResponse = {
  availabilityStatus: AvailabilityStatus;
  price: Price;
};
