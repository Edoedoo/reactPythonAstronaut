import React, { useEffect, useState } from 'react';
import Lottie from "lottie-react";
import astronot from "../assets/astronot2.json";
import Typewriter from './Typewriter';
import "./home.css"

const Home = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [flip, setFlip] = useState(false);
  const [rotate, setRotate] = useState(0);
  const [longText, setLongText] = useState(`Halo ${userData.username}! Kita telah melintasi batas atmosfer. Pemandangan dari sini... sungguh menakjubkan!`);

  useEffect(() => {
    const messages = [
      "🚀 Mau pergi kemana kita sekarang?",
      "🌌 Tetap waspada! kita tidak tahu ada ancaman apa disini",
      "Apa kamu sudah tahu misi yang akan kamu ambil?",
      "Saya akan membantu apapun yang kamu minta..",
      "🚨 Gawat!!! Sepertinya kamu banyak memiliki banyak misi, apakah kamu siap?",
      "lihat...",
      "Bagaimana jika kita mulai memilih misi? Kita selesaikan semua misi itu !",
      "👍 Setuju?",
      "📝 Atau kita lengkapi profil terlebih dahulu sebelum menyelesaikan misi?",
      `🚀 Aku siap mengantarmu kemanapun ${userData.username}!`,
    ];

    let i = 0;
    const interval = setInterval(() => {
      setLongText(messages[i % messages.length]);
      i++;
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const offsetX = (e.clientX - centerX) / centerX;
      const offsetY = (e.clientY - centerY) / centerY;

      const moveX = offsetX * 150;
      const moveY = offsetY * 100;

      setPosition({ x: moveX, y: moveY });
      setFlip(moveX > 0);
      setRotate(moveY > 0 ? -40 : 0);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className='main'>
      <div className='main1'><div className='content'>main 1</div></div>
      <div className='main2'><div className='content'>main 2</div></div>
      <div className='main3'><div className='content'>main 3</div></div>
      <div className='main4'>content 4</div>

      <div className='main5'>
        <div className="msgAstro"> 
          <Typewriter key={longText} text={longText} speed={10} />
        </div>
        <div
          onClick={() => setLongText(`👽 Uhh! kau menyentuhku ${userData.username} !!!`)}
          style={{
            width: 300,
            cursor: 'pointer',
            transform: `
              translate(${position.x}px, ${position.y}px)
              scaleX(${flip ? -1 : 1})
              rotate(${rotate}deg)
            `,
            transition: 'transform 1.3s ease-out'
          }}
        >
          <Lottie animationData={astronot} loop={true} />
        </div>
      </div>

      <div className='main6'><div className='contentMain6'></div></div>
      <div className='main7'>content 7</div>
      <div className='main8'><div className='contentMain8'>content 8</div></div>
      <div className='main9'>content 9</div>
    </div>
  );
};

export default Home;
