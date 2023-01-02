import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Storage from './routes/storage';
import Login from './routes/login';
import Logout from './routes/logout';
function App() {
  return (
    <Router>
      <div>
        <Routes>
        <Route exact path="/" element={<Storage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
