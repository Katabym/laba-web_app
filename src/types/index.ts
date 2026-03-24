export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  filePath: string;
  fileType: 'cpp' | 'rar' | 'docx' | 'pdf' | 'zip';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}
