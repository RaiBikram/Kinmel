import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import 'antd/dist/reset.css';
import App from "./App";

// hash router 
import { HashRouter as Router } from "react-router-dom";
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


