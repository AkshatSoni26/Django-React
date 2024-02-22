import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reducerContants } from '../../redux/constant'
import helper from '../../Helpers/Helpers'
import { useNavigate } from 'react-router-dom'
import { frontend_urls } from '../../urrls.js'



function Header() {

    const code = useSelector(state => state.code)
    const input = useSelector(state => state.input)
    const loading = useSelector(state => state.loading)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function codeRun() {
        dispatch({ type: reducerContants.LOADING })
        const data = await helper.runCode(code, input);
        dispatch({ type: reducerContants.RUN_CODE, payload: data })
    }

    async function prevSubmissions() {
        dispatch({ type: reducerContants.IS_EDITIOR })
        const data = await helper.prevSub();
        dispatch({ type: reducerContants.SUBMISSIONS, payload: data })
    }

    useEffect(
        () => {
            const user = localStorage.getItem("@user")
            if (!user) {
                navigate(frontend_urls.home)
            }
        }, []
    )

    return (
        <div className='w-100 d-flex justify-content-between'>
            <div className='ms-3'>
                Python IDE
            </div>
            <div>
                <button className='me-1 mt-2' onClick={codeRun} disabled={loading} style={{ cursor: loading ? 'progress' : 'pointer' }}>
                    <span className='px-2 py-1 rounded' >
                        Run
                    </span>
                </button>
                <button className='me-1 mt-2' onClick={prevSubmissions} disabled={loading} style={{ cursor: loading ? 'progress' : 'pointer' }}>
                    <span className='px-2 py-1 rounded' >
                        prev. submissions
                    </span>
                </button>

                <button className='me-3 mt-2' onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                }} disabled={loading} style={{ cursor: loading ? 'progress' : 'pointer', }}>
                    <span className='px-2 py-1 rounded' style={{ backgroundColor: 'red' }} >
                        Logout
                    </span>
                </button>
            </div>
        </div>
    )
}

export default Header