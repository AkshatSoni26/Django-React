import "./css/App.css";
import Home from "./pages/Home";
import {
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { frontend_urls } from "./urrls";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={frontend_urls.login} element={<Login />} />
        <Route path={frontend_urls.register} element={<Register />} />
        <Route path="" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
