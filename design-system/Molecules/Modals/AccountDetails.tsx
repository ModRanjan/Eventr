import React from 'react';
import { Modal } from '../../Atom/Modal';
import { FiCopy } from 'react-icons/fi';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import { Image } from '../../Atom/Image';

type PropsType={
  isModalOpen:boolean;
  handleCloseModal:()=>void;
  currentAccount:string;
  etherscan:string;
}

export default function AccountDetails({
  isModalOpen,
  handleCloseModal,
  currentAccount,
  etherscan,
}:PropsType) {
  return (
    <Modal open={isModalOpen} handleCloseModal={handleCloseModal} label="Account">
      <div className="space-y-2">
        <div className="p-4 border-2 border-gray-300 rounded-lg md:space-y-3">
          <p className="text-base text-gray-500">connected with metamask </p>
          <div className="flex flex-wrap items-center">
            <Image
              className="h-12"
              src={'/images/accountLogo.png'}
              alt="logo"
            />
            <p title={currentAccount} className="px-2 text-xl ">
              {currentAccount.slice(0, 5) +
                '...' +
                currentAccount.slice(38, 42)}
            </p>
          </div>
          <div className="flex space-x-5 text-gray-500">
            <CopyToClipboard text={currentAccount}>
              <button
                onClick={() =>
                  toast.success('Copied Successfull', { autoClose: 50 })
                }
                className="flex items-center space-x-1 text-sm cursor-pointer"
              >
                <FiCopy />
                <span> copy Address</span>
              </button>
            </CopyToClipboard>

            <a
              href={`${etherscan}${currentAccount}`}
              target="_blank"
              className="flex items-center space-x-1 text-sm cursor-pointer"
              rel="noreferrer"
            >
              <BsBoxArrowUpRight />
              <span>view on Etherscan</span>
            </a>
          </div>
        </div>
        <div className="flex flex-wrap justify-center space-x-3">
          <button
            onClick={handleCloseModal}
            className="   py-1.5 px-5 bg-indigo-500  text-white rounded-xl  cursor-pointer"
          >
            Back
          </button>
        </div>
      </div>
    </Modal>
  );
}
