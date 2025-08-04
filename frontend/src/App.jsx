import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import Menu from './components/Menu';
import Home from './components/Home';
import Pengaturan from './components/Pengaturan';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route 
          path="/menu" 
          element={
            <PrivateRoute>
              <Menu />
            </PrivateRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="pengaturan" element={<Pengaturan />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
