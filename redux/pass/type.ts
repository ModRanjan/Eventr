export type Pass = {
  id: number;
  title: string;
  slug: string;
  dropType: 'mint' | 'premint' | 'claim';
  contractType: 'ERC721' | 'ERC1155';
  deployed: boolean;
  claimListHash?: string;
  contractAddress: string;
};
