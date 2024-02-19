import { useEffect } from "react"
import CodeSpace from "../components/code_space/CodeSpace"
import ComilerSpace from "../components/complier_space/ComilerSpace"
import Header from "../components/header/Header"
import TestSpace from "../components/test_space/TestSpace"
import { useNavigate } from "react-router-dom"


function Home() {

    const navigate = useNavigate()

    useEffect(
        () => {

            const userId = localStorage.getItem('@user')

            if (!userId) {
                navigate("/login")
            }

        }, []
    )

  return (
    <div id="App" className="h-100 w-100">
      <Header />
      <div className="d-flex h-100 w-100">
        <CodeSpace />
        <div className="comiler-and-test-case m-2 ms-0">
          <TestSpace />
          <ComilerSpace />
        </div>
      </div>
    </div>
  )
}

export default Home