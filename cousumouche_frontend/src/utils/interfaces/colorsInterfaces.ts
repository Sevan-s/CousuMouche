export interface IColors {
    data: IColorData[]
    meta: Meta
  }
  
  export interface IColorData {
    _id: number
    name: string
  }
  
  export interface Attributes {
    
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
  