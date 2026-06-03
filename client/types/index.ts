export interface Product {
    _id: string;
    title: string;
    image: string;
    price: number;
    description: string;
    category: string;
  }
  
  export interface ProductsResponse {
    status: string;
    results: number;
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
    data: Product[];
  }