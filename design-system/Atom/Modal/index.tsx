import { GiCancel } from 'react-icons/gi';
import { default as ReactModal } from 'react-modal';

type ModalProps = {
  open:boolean;
  handleCloseModal:()=>void;
  label:string;
  children:React.ReactNode;
}
export const Modal = ({ open, handleCloseModal, label, children }:ModalProps) => {
  return (
    <div>
      <ReactModal
        isOpen={open}
        onRequestClose={handleCloseModal}
        contentLabel="Wallet Details"
        className=" shadow-2xl p-5 mt-20  md:w-2/5 mx-auto  rounded-2xl bg-white shadow-indigo-600 space-y-2"
      >
        <div className="flex justify-between text-xl ">
          <h3 className="inline "> {label} </h3>
          <div className="float-right">
            <button onClick={handleCloseModal}>
              <GiCancel />
            </button>
          </div>
        </div>

        {children}
      </ReactModal>
    </div>
  );
};
