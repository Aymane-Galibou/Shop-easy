import React from 'react'
import SideBar from '@/Components/Sidebar/Sidebar'




function layout({children}:{children:React.ReactNode}) {
  
  return <>


<SideBar/>


<div>
    {children}

</div>

  
  </>

  
}

export default layout