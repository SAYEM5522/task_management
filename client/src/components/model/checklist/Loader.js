import React from 'react'

const Loader = ({size}) => {
  return (
    <div class="flex items-center justify-center ">
    <div  style={{
      width:`${size}px`,
      height:`${size}px`
    }} class={`border-b-2 border-black rounded-full animate-spin`}></div>
   </div>
  )
}

export default Loader