
import {createContext, useContext, useState, useEffect} from "react";

 const cartContext = createContext();


// constext provider 

export const CartContextProvider = ({children})=>{
const [cart, setCart] = useState([]);
useEffect(()=>{
let existingCartItem = localStorage.getItem(('cart'));
if(existingCartItem){
  setCart(JSON.parse(existingCartItem));
}
},[])
  return (
    <cartContext.Provider value={[cart, setCart]}>
{children}
    </cartContext.Provider>
  )
}

// usecontext
export const useCart = ()=> useContext(cartContext);
