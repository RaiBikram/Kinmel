import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import 'antd/dist/reset.css';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./contextAPI/Auth.Context";
import { SearchContextProvider } from "./contextAPI/SearchContext";
import { CartContextProvider } from "./contextAPI/cartContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
  <AuthContextProvider>
    <SearchContextProvider>
      <CartContextProvider>
  <Router>
    <App />
  </Router>
  </CartContextProvider>
  </SearchContextProvider>
  </AuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
