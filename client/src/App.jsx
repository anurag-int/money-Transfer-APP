import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Dashboard}  from "./components/Dashboard";
import {PaymentPage} from "./components/PaymentPage";
import {Signin} from "./components/Signin";
import {Signup} from "./components/Signup"
import {PaymentDone} from "./components/PaymentDone";
import {PaymentFailed} from "./components/PaymentFailed"

function App() {

  return <div>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/signin" element={<Signin></Signin>}></Route> 
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/send" element={<PaymentPage></PaymentPage>}></Route>
          <Route path="/success" element={<PaymentDone></PaymentDone>}></Route>
          <Route path="/failed" element={<PaymentFailed></PaymentFailed>}></Route>
        </Routes>
      </Router>
    </div>
}

export default App;
