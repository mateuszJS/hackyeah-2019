export type Airport = {
  city: string
  iata: string
}

export type Destination = {
  country: string
  cities: Airport[]
}
