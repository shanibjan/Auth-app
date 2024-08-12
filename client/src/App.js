import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";
import User from "./Pages/User";

function App() {
  return (
    <div className='app'>
      <Router>
        <Routes>
        <Route Component={Register} exact path='/' />
        </Routes>
        <Routes>
        <Route Component={Login} exact path='/login' />
        </Routes>

        <Routes>
        <Route Component={Admin} exact path='/admin' />
        </Routes>
        <Routes>
        <Route Component={User} exact path='/user' />
        </Routes>
        


      </Router>
       

    </div>
  );
}

export default App;
