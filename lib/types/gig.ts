export interface SellerInfo {
  id: number;
  name: string | null;
  image: string | null;
}

export interface Gig {
  id: number;
  title: string;
  price: number;
  category?: string | null;
  thumbnail?: string | null;
  rating?: number | null;
  seller: SellerInfo;
}

export interface GigDetails extends Gig {
  description: string;
  views: number;
}
