import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reducerContants } from '../../redux/constant'

function Header() {

    const code = useSelector(state => state.code)
    const loading = useSelector(state => state.loading)
    const dispatch = useDispatch()

    function codeRun() {
        console.log("code is running.")
        dispatch({type:reducerContants.LOADING})
    }

  return (
    <div className='w-100 d-flex justify-content-between'>
        <div className='ms-3'>Python IDE</div>
        <div style={{backgroundColor:'red'}}>This IDE is currently supported only for python.</div>
        <button className='me-3' onClick={codeRun} disabled={loading} style={{cursor: loading ? 'progress' : 'pointer'}}>
            <span className='px-2 py-1 rounded' >
                Run
            </span>
        </button>
    </div>
  )
}

export default Header