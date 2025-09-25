import { useState, useEffect } from 'react'
import './App.css'
import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AboutUs from './components/Aboutus';
import Customers from './components/Customers';
import Companies from './components/Companies';
import Messages from './components/Messages';
import Outlook from './components/Outlook';
import Home from './components/Home'
import ProductPage from './components/ProductPage'
import Cart from './components/Cart';
import Payment from './components/Payment';
import Orders from './components/Orders';
import Deals from './components/Deals';
import Tasks from './components/Tasks';
import { seedData } from './seedData';


function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const seeded = localStorage.getItem('seeded');
    if (!seeded) {
      seedData();
      localStorage.setItem('seeded', 'true');
    }
  }, []);
  
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route index element={<AboutUs />} />
          <Route path="home" element={<Home />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="customers" element={<Customers />} />
          <Route path="companies" element={<Companies />} />
          <Route path="messages" element={<Messages />} />
          <Route path="outlook" element={<Outlook />} />
          <Route path="deals" element={<Deals />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="productpage" element={<ProductPage />} />
          <Route path="cart" element={<Cart />} />
          <Route path="payment" element={<Payment />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App