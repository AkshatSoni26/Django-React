import React from 'react'
import { useSelector } from 'react-redux'

function Header() {

    const data = useSelector(state => state.key)

  return (
    <div className='w-100 d-flex justify-content-end'>
        <button className='me-3'>
            <span className='px-2 py-1 rounded'>
                Run
            </span>
        </button>
    </div>
  )
}

export default Header