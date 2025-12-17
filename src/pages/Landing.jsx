import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate('/registration', { replace: true });
  };
  return (
    <div className="landing">
      <div className="landingContainer">
        <div className="sec1">
          <div className="logoContainer">
            <img src="/Logo_color2.webp" alt="Logo" className="logo" />
          </div>
          <h1>Please scan QR code</h1>
          <p>Use your mobile camera to continue</p>
        </div>

        <div className="sec2">
          <img
            src="/qr.png"
            alt="QR Code"
            className="qr"
            onClick={() => startQuiz()}
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
