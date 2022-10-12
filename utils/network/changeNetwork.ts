import { addNewNetwork } from './addNewNetwork';

type Props = {
  chainId: number;
  name: string;
  rpc: string[];
};
export async function changeNetwork({ chainId, name, rpc }: Props) {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${Number(chainId).toString(16)}` }],
      });
      console.log('network change success');
    } catch (switchError: any) {
      if (switchError.code === 4001) {
        console.log('Reject switch network request');
      } else if (switchError.code === 4902) {
        await addNewNetwork({ chainId: chainId, name: name, rpc: rpc });
      }
    }
  }
}
