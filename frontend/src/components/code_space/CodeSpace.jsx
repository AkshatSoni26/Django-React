import React from 'react'
import { useDispatch } from 'react-redux'
import { reducerContants } from '../../redux/constant'

function CodeSpace() {

    const dispatch = useDispatch()

    function codeSaver(e) {
        const code = e.target.value
        console.log(code)
        dispatch({type:reducerContants.CODE, payload:code})
    }

  return (
    <div id='CodeSpace'>
        <div className='m-2 rounded codie-space'>
        <textarea className="form-control floatingTextarea" onBlur={codeSaver} placeholder="write your code here..."></textarea>
        </div>
    </div>
  )
}

export default CodeSpace