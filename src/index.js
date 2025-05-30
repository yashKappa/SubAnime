import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

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



// index.js
// import ReactDOM from 'react-dom/client';
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import App from './App';
// import './index.css';

// // Using createRoot for React 18
// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <React.StrictMode>
//     <Router basename="/SubAnime">
//       <Routes>
//         <Route path="/" element={<App />} />
//       </Routes>
//     </Router>
//   </React.StrictMode>
// );
