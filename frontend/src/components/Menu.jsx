import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './menu.css';

function Menu() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user'));
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const confirmLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="menuApp">
      <div className='header'>
        <div className='leftNavbar'>
          <div className='tetris-btn' onClick={() => navigate('/menu')}>🏠 Menu</div>
          <div className='tetris-btn'>📖 Misi</div>
          <div className='tetris-btn'>📚 Pengetahuan</div>
        </div>

        <div className='titleCompany'>
          <div className='titleTop'>MISI LUAR ANGKASA</div>
          <div className='titleBotttom'>mencari sejarah dan kebenaran</div>
        </div>

        <div className='rightNavbar'>
          <div className='tetris-btn'>Evaluasi</div>
          <div className='tetris-btn' onClick={() => setShowLogoutPopup(true)}>Logout</div>
          <div className='tetris-btn' onClick={() => navigate('/menu/pengaturan')}>Pengaturan</div>
        </div>
      </div>

      <Outlet />

      <div className='footer'>🌐 Versi: v1.0 Beta</div>

      {showLogoutPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="popup-text">Yakin ingin logout?</div>
            <div className="popup-actions">
              <button className="tetris-btn confirm" onClick={confirmLogout}>Ya, Logout</button>
              <button className="tetris-btn cancel" onClick={() => setShowLogoutPopup(false)}>Batal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;
