import React from 'react'


const Navbar = () => {
  return (
    <nav className='flex justify-between bg-blue-400 py-2'>
        <div className="logo">
            <span className='font-bold text-xl mx-8'>iTask</span>
        </div>
        <ul className='flex gap-6 mx-9'>
           
            <li className='cursor-pointer hover:font-bold'>Home</li>
            
            
        </ul>
    </nav>

  )
}

export default Navbar
