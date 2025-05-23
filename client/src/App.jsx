import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Home from "./components/User/Home/Home";
import Admin from "./components/Admin/Home/Admin";
import Add from "./components/Admin/AddBook/Add";
import Booknow from "./components/User/Book/Book";
import Cart from "./components/User/Cart/Cart";
import Notfound from "./components/Auth/Notfound";
import ViewBook from "./components/Admin/ViewBook/ViewBook";
import ViewUser from "./components/Admin/ViewUser/ViewUser";
import React from 'react';
import { SocketProvider } from './SocketContext';
import YourAppComponent from './YourAppComponent'; // Your main app component

function App() {
  
    <SocketProvider>
        <YourAppComponent />
    </SocketProvider>

  const isAutheniticated = () => {
    return localStorage.getItem("token") !== null;
  };
  return (
    <>
      <Routes>
        Auth Routes
        <Route path="/" element={<Login />} />
        <Route path="*/" element={Notfound} />
        //User Routes
        <Route
          path="/welcome"
          element={isAutheniticated() ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/cart"
          element={isAutheniticated() ? <Cart /> : <Navigate to="/" />}
        />
        //Admin Routes
        <Route
          path="/admin"
          element={isAutheniticated() ? <Admin /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/add-new-book"
          element={isAutheniticated() ? <Add /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/view-book"
          element={isAutheniticated() ? <ViewBook /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/view-user"
          element={isAutheniticated() ? <ViewUser /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
