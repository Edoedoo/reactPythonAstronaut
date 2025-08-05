import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import png from '../src/assets/loginForm.png'
import Typewriter from './components/Typewriter';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const longText = "selamat datang di stasiun luar angkasa";

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/menu');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("sedang mencari astronaut...");
    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      setMsg(data.message);

      if (data.success) {
        const userData = {
          id: data.id,
          username: data.username,
          email: data.email,
          token: data.token
        };
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', data.token); 
        setTimeout(() => {
          navigate('/menu');
        }, 2000);
      }
      
    } catch (err) {
      setMsg('Gagal login');
    }
  };

  return (
    <body>
    <section className="container">
        <div className="login-container">
            <div className="circle circle-one"></div>
            <div className="form-container">
                <Typewriter className='opacity' key={longText} text={longText} speed={200} />
                <img src={png} alt="illustration" className="illustration" />
                <form onSubmit={handleSubmit}>
                    <input
                      type="username"
                      placeholder="Nama pendaftar"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required/>
                    <input 
                      type="password"
                      placeholder="Token pendaftar"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required/>
                    <button className='opacity' type="submit">Jelajah!</button>
                    <h5 className='opacity'>{msg}</h5>
                </form>
            </div>
            <div className="circle circle-two"></div>
        </div>
    </section>
</body>
  );
}

export default LoginForm;
