
export interface Iproduct {
  products: Product[]
}

export interface IWho {
  name: string,
  price: number
}

export interface Product {
  _id: string
  name: string
  slug: string
  price: number
  description: string
  dimension: string
  composition: string
  shortDescription: string
  maintenance: string
  stock: number
  category: string
  subCategory: string[]
  createdAt: string
  __v: number
  imageUrl?: string
  imageUrls?: string[]
  options?: string[]
  fabrics?: string[]
  fabricsQuantities: number
  associateProduct?: []
  who: IWho[]
  lot: Lot[];
  dimensions: Dimensions[]
}

export interface Dimensions {
label: string
price: number
}

export type Lot = {
  quantities: number;
  price: number;
};

export interface productData {
  id: number
  attributes: Attributes
}

export interface Attributes {
  ProductName: string
  Presentation: string
  Description: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  ProductPicture: ProductPicture
  secondaryPicturesProduct: SecondaryPicturesProduct
  categories: Categories
  Price: number
  Entretien: string
  Personnalisation: string
}

export interface ProductPicture {
  data: Data
}

export interface Data {
  id: number
  attributes: Attributes2
}

export interface Attributes2 {
  name: string
  alternativeText: string
  caption: any
  width: number
  height: number
  formats: Formats
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string
  provider: string
  provider_metadata: any
  createdAt: string
  updatedAt: string
}

export interface Formats {
  thumbnail: Thumbnail
}

export interface Thumbnail {
  name: string
  hash: string
  ext: string
  mime: string
  path: string
  width: number
  height: number
  size: number
  sizeInBytes: number
  url: string
}

export interface SecondaryPicturesProduct {
  data: Daum2[]
}

export interface Daum2 {
  id: number
  attributes: Attributes3
}

export interface Attributes3 {
  name: string
  alternativeText: string
  caption: any
  width: number
  height: number
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string
  provider: string
  provider_metadata: any
  createdAt: string
  updatedAt: string
}

export interface Categories {
  data: any[]
}

export interface Meta {
  pagination: Pagination
}

export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}