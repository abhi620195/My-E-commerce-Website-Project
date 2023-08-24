import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/cartReducer";


const CartContext = createContext();

const getLocalCartData = () => {
  let localCartData = localStorage.getItem("data")
  if (localCartData === []) {
    return [];
  } else {
    return JSON.parse(localCartData);
  }
}


const initialState = {
  // cart: [],
  cart: getLocalCartData(),
  total_item: "",
  total_amount: "",
  shipping_fee: 50000,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //to add item to the cart

  const addToCart = (id, color, amount, product) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
  };

  // to decrement and increment to the cart

  const setDecrease = (id) => {
    dispatch({ type: "SET_DECREMENT", payload: id })
  }

  const setIncrease = (id) => {
    dispatch({ type: "SET_INCREMENT", payload: id })
  }

  // to remove the iem from the cart

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  // to clear the cart

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  // to add the data in localStorage

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(state.cart))
  }, [state.cart])

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeItem, clearCart, setDecrease, setIncrease }}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };