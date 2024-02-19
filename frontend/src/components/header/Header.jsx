import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reducerContants } from '../../redux/constant'
import helper from '../../Helpers/Helpers'



function Header() {

    const code = useSelector(state => state.code)
    const loading = useSelector(state => state.loading)
    const dispatch = useDispatch()

    async function codeRun() {
        dispatch({type:reducerContants.LOADING})
        const data = await helper.runCode(code);
        dispatch({type:reducerContants.RUN_CODE, payload: data})
    }

    async function prevSubmissions() {
        dispatch({type:reducerContants.IS_EDITIOR})
        const data = await helper.prevSub();
        dispatch({type:reducerContants.SUBMISSIONS, payload: data})
    }

  return (
    <div className='w-100 d-flex justify-content-between'>
        <div className='ms-3'>Python IDE</div>
        <div style={{backgroundColor:'red'}}>This IDE is currently supported only for python.</div>

        <div>
        {/* <button className='me-1' onClick={codeRun} disabled={loading} style={{cursor: loading ? 'progress' : 'pointer'}}>
            <span className='px-2 py-1 rounded' >
                editior
            </span>
        </button> */}
        <button className='me-1' onClick={codeRun} disabled={loading} style={{cursor: loading ? 'progress' : 'pointer'}}>
            <span className='px-2 py-1 rounded' >
                Run
            </span>
        </button>
        <button className='me-3' onClick={prevSubmissions} disabled={loading} style={{cursor: loading ? 'progress' : 'pointer'}}>
            <span className='px-2 py-1 rounded' >
                prev. submissions
            </span>
        </button>
        </div>
    </div>
  )
}

export default Header