
import './App.css';
import Header from './Component/Header';
import Product from './Component/Product';
import Navbar from './Component/Navbar';
import Cart from './Component/Cart';
import Checkout from './Component/Checkout';
import React, { useEffect, useState } from "react";
import {commerce} from './Component/commerce';
import {BrowserRouter as Router,Switch , Route} from 'react-router-dom';
import OrderConfirm from './Component/OrderConfirm';

function App() {
  const [pro, setPro] = useState([]);
  const [order,setOrder] = useState({});
  const [cart, setCart] = useState([]);

  const fetchCart =async()=>{
    const response = await commerce.cart.retrieve();
    setCart(response);
   console.log("Cart1",cart);
  }

  const fetchPro = async () =>{
    const {data} = await commerce.products.list(); // this line is written as it  is commerce.products.list()  its an api call for commerce store
    setPro(data);
  }

  const handleatc = async (productId, quantity) =>{
    const item =  await commerce.cart.add(productId,quantity);
    setCart(item.cart);
    console.log("cart",cart);
  }

  const handleupdatecart = async (productId, quantity) =>{
    const response =  await commerce.cart.update(productId, {quantity});
    setCart(response.cart);
  }

  const handleremovecart = async (productId) =>{
    const response =  await commerce.cart.remove(productId);
    setCart(response.cart);
  } 

  const handleempty = async () =>{
    const response =  await commerce.cart.empty();
    setCart(response.cart);
  }

  const refreshCart = async () =>{
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  }
  const handleCaptureCheckout = async (checkoutTokenId, newOrder) =>{
    try {
      const incomingorder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setOrder(incomingorder);
      refreshCart();
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    fetchPro();
    fetchCart();
  },[]);

  console.log(cart);
  
  return (
    <Router>
    <Navbar totalitems={cart.total_items}/>
    
    <Switch>
      <Route exact path="/"><Product pro = {pro} onatc = {handleatc}/></Route>
      <Route exact path="/cart"><Cart cart={cart} handleempty={handleempty} handleremovecart={handleremovecart} handleupdatecart={handleupdatecart}/></Route>
      <Route exact path="/checkout"><Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} handleempty={handleempty}/></Route>
      <Route exact path="/OrderConfirm"><OrderConfirm/></Route>
    </Switch>
    
    
    </Router>
  );
}

export default App;
