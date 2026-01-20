import React, { useContext } from 'react'
import Navbar from '../components/Navbar.jsx'
import Card from '../components/Card.jsx'
import { listingDataContext } from '../context/ListingContext.jsx'

const Home = () => {
  let {listingData,setListinga} = useContext(listingDataContext)
  return (
    <div>
      <Navbar />
      <div className='w-screen h-[77vh] flex justify-center items-center gap-8 flex-wrap mt-62.5 md:mt-20'>
       {listingData.map((list)=>(
        <Card title={list.title}  landmark={list.landmark} city={list.city} image1={list.image1}  image2={list.image2} image3={list.image3} rent={list.rent}  id={list._id} /> 
       ))}
      </div>
      
      
    </div>
  )
}

export default Home