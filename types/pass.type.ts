export interface CreatePass {
  title: string;
  dropType: 'mint' | 'premint' | 'claim';
  contractType: 'ERC721' | 'ERC1155';
  contractAddress: string;
  eventId: number;
}

export interface UpdatePass {
  title: string;
  dropType?: 'mint' | 'premint' | 'claim';
  contractType: 'ERC721' | 'ERC1155';
  contractAddress: string;
}
