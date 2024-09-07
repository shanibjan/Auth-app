import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import User from "./Pages/User";
import AllTasks from "./Pages/AllTasks";

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
        <Route Component={User} exact path='/user' />
        </Routes>
        <Routes>
        <Route Component={AllTasks} exact path='/all_tasks' />
        </Routes>


      </Router>
       

    </div>
  );
}

export default App;
