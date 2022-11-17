import React from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route
} from "react-router-dom";
import Login from './pages/login';
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
