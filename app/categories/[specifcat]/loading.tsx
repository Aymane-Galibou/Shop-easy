import React from 'react'

function loading() {
  return <>
  
  <div className='w-full h-screen flex justify-center items-center z-50'>
    <div className='w-[50px] h-[50px] border-t-2 border-red-600 animate-spin rounded-full'></div>
  </div>

  </>
}

export default loading