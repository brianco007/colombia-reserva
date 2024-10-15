export interface ReviewModel {
  _id: string,
  businessId: string | null,
  comment: string,
  stars: number,
  createdAt: string
}