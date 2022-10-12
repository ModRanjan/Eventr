import React from 'react';
import { Label } from '../../Atom/Label';
import { Input } from '../../Atom/Input';
import { Button } from '../../Atom/Button';
import { useState,useRef } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';
import { contractAddress } from '../../../constant';
import { ConnectWallet } from '../UserAccount/ConnectWallet';
import Web3Boilerplate from '../../../artifacts/contracts/abis/Web3Boilerplate.json';
import {IRootState} from "../../../redux/store"
const Hero = () => {
  const walletData = useSelector((state:IRootState) => state).WalletDataReducer;
  const inputRef=useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [name, setName] = useState('');
  const handleOnChange = () => {
    console.log(inputRef.current)
    let entereName= inputRef.current?.value;
    if (entereName == '') {
      setInputError(true);
      toast.error("name can't be empty");
    } else {
      setInputError(false);
    }
    if(typeof entereName == 'string') {

      setName(entereName);
    }
  };
  const userRegistration = async () => {
    let signer: ethers.providers.JsonRpcSigner|undefined;
    signer = walletData.signer;
    const contract = new ethers.Contract(
      contractAddress,
      Web3Boilerplate.abi,
      signer,
    );

    if (name === '') {
      toast.error('Invalid Input');
      return 0;
    }
    try {
      setLoading(true);
      const transaction = await contract.userRegistration(name);
      console.log(transaction);
      toast.success(
        'Transaction is placed, wait till it gets confirmed on blockchain',
      );
      const tx = await transaction.wait();
      toast.success('user Registered  Successfull');
      setLoading(false);
    } catch (error:any) {
      setLoading(false);
      if (error.code === 4001) {
        toast.error('User denied transaction signature');
      } else {
        toast.error(error.reason);
      }
    }
  };
  return (
    <div className="w-full mx-auto my-10 bg-white shadow-sm md:w-2/5 shadow-blue-300">
      <Label className="p-3 text-2xl font-bold">Web3</Label>
      <hr />
      <div className="p-5 space-y-5">
        <Label className="text-xl font-semibold text-center">
          User Registration
        </Label>
        <Input
          label="Enter Name :"
          type="text"
          inputRef={inputRef}
          placeholder="enter your name"
          onChange={handleOnChange}
          error={inputError}
          errorMsg=" Name Can't be empty"
        />
        {walletData.isConnected ? (
          <Button loading={loading} onClick={userRegistration}>
            Register
          </Button>
        ) : (
          <ConnectWallet />
        )}
      </div>
    </div>
  );
};

export default Hero;
