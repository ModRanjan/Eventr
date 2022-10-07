import type { NextPage } from 'next'
import Head from 'next/head'
import { default as HomePage } from '../design-system/Organisms/Home';
const Home: NextPage = () => {
  const handleOnClick=()=>{
    alert("Clicked")
  }

  const handleFunction=(data:number)=>{
    alert(data)
  }


  return (
    <div>
      <Head>
        <title>Web3-Boilerplate</title>
        <link rel="icon" href="/images/web3.png" />
      </Head>

     <HomePage />
      
      </div>
  )
}

export default Home
