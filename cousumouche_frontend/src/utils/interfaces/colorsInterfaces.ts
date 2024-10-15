export interface IColors {
    data: IColorData[]
    meta: Meta
  }
  
  export interface IColorData {
    id: number
    attributes: Attributes
  }
  
  export interface Attributes {
    Colors: string
    createdAt: string
    updatedAt: string
    publishedAt: string
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
  