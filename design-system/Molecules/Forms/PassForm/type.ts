// export type DropTypes: 'mint' | 'premint' | 'claim';

export interface FormPassValues {
  title: string;
  dropType: 'mint' | 'premint' | 'claim';
  contractType: 'ERC721' | 'ERC1155';
  contractAddress: string;
}

export interface FormPassOptions {
  dropType: ['mint', 'premint', 'claim'];
  contractType: ['ERC721', 'ERC1155'];
}
