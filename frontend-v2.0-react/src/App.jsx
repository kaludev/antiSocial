import React from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route
} from "react-router-dom";
import Login from './pages/loginAndRegister/login';
import Register from './pages/loginAndRegister/register'
import Home from './pages/Home/Home'
import "./style.css"
import Profile from './pages/profile/profile';
import ContextProvider from './context/stateContext';


function App() {
  return (
    <Router>
      <ContextProvider>
      <Routes>
        <Route 
          exact path = '/'
          element ={<Home />}
        />
        <Route
          exact path="/login"
          element= {<Login />} 
          />
          <Route
          exact path="/register"
          element= {<Register />} 
          />
          <Route
          exact path="/:username"
          element= {<Profile />}
          />
        <Route 
          path="*"
          element={
            <div>
              <h1>404 - Page does not exist</h1>
              <a href='/'>Back to home</a>
            </div>
          }
        />
      </Routes>
      </ContextProvider>
		</Router>
  );
}

export default App;
