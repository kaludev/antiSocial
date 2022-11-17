import React from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route
} from "react-router-dom";
import Login from './pages/loginAndRegister/login';
import Register from './pages/loginAndRegister/register'
import "./style.css"
function App() {
  return (
    <Router>
      <Routes>
        <Route
          exact path="/login"
          element= {<Login />} 
          />
          <Route
          exact path="/register"
          element= {<Register />} 
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
		</Router>
  );
}

export default App;
