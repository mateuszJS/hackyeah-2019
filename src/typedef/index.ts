export type Airport = {
  city: string
  iata: string
  tags: string[]
};

export type Destination = {
  country: string
  cities: Airport[]
  annualTemp: string
  currency: string
};

export type Flight = {
  data: string;
  inbound: Object;
  outbound: Object;
  duration: number;
  segments: any[];
  fareType: string;
  totalPrice: Object;
  price: number;
  url: string;
  stopTime: number;
};

export type FetchFlightsParams = {
  params: FetchFlightsParamsData;
};

export type FetchFlightsParamsData = {
  cabinClass: string;
  market: string;
  departureDate: string[];
  returnDate: string;
  origin: string[];
  destination: string[];
  tripType: string;
  adt: number;
};
