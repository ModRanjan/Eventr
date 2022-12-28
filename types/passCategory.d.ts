export interface CreatePassCategory {
  title: string;
  numberOfTokens: number;
  price: number;
  passId: number;
  tokenId?: number;
}

export interface UpdatePassCategory {
  title: string;
  numberOfTokens: number;
  price: number;
  tokenId?: number;
}
