export interface OfferModel {
  _id: string,
  businessId: string | null,
  service: string,
  description?: string,
  price?: number
}