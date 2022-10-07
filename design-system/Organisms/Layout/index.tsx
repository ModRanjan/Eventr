import React,{useState, useEffect} from 'react'
import Footer from '../Footer';
import Header from '../Header'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MenuBar } from '../../Molecules/MenuBar';
type LayoutProps={
    children: React.ReactNode;
}
const Layout = ({children}:LayoutProps) => {
  const [render,setRender]=useState(false);
  useEffect(() =>setRender(true),[])
  return render && (
    <div className="min-h-screen bg-indigo-50 my-font ">
        <Header/>
        <div className="hidden md:block">
          <MenuBar />
        </div>
        {children}
        <Footer/>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
        />
    </div>
  )
}

export default Layout