import { BiMenu } from 'react-icons/bi';
import { ImCross } from 'react-icons/im';
type PropsType={
  onClickMenu:()=>void;
  openMenu:boolean;
}
export const Menu = ({ onClickMenu,openMenu}:PropsType) => {
  return (
    <button
      className="md:hidden text-3xl border-2 border-indigo-300 rounded-md mr-4"
      onClick={onClickMenu}
    >
      {openMenu ? <ImCross /> : <BiMenu />}
    </button>
  );
};
