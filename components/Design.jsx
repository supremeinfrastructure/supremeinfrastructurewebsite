import Image from 'next/image'
import React from 'react'

const Design = () => {
  return (
    <div>
      <Image 
        src='/images/design.jpg'
        width={500}
        height={300}
        alt="Design image"
      />
    </div>
  )
}

export default Design