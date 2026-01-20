import React from 'react'

const Card = ({title,landmark,image1,image2,image3,rent,city,id}) => {
  return (
    <div>
        <div>
            <img src={image1} alt="" />
            <img src={image2} alt="" />
            <img src={image3} alt="" />
        </div>
        <div>
            <span>In {landmark.toUpperCase()} , { city.toUpperCase()}  </span>
            <span> {title.toUpperCase()}   </span>
            <span> Rs.{rent}/night  </span>
        </div>
    </div>
  )
}

export default Card
