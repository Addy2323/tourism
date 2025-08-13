import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [loadingText, setLoadingText] = useState("Loading your Tanzania adventure...");
  const [animationsPaused, setAnimationsPaused] = useState(false);

  const loadingTexts = [
    "Loading your Tanzania adventure...",
    "Preparing safari experiences...",
    "Discovering Kilimanjaro magic...",
    "Crafting Zanzibar dreams...",
    "Loading Serengeti wonders...",
    "Synchronizing with nature...",
    "Brewing authentic experiences..."
  ];

  useEffect(() => {
    const textInterval = setInterval(() => {
      const randomText = loadingTexts[Math.floor(Math.random() * loadingTexts.length)];
      setLoadingText(randomText);
    }, 2000);

    const loadingTimer = setTimeout(() => {
      onLoadingComplete();
    }, 4000);

    return () => {
      clearInterval(textInterval);
      clearTimeout(loadingTimer);
    };
  }, [onLoadingComplete]);

  const toggleAnimations = () => {
    const particles = document.querySelectorAll('.loading-particle');
    const title = document.querySelector('.loading-title');
    const text = document.querySelector('.loading-text');
    
    if (animationsPaused) {
      particles.forEach(particle => {
        (particle as HTMLElement).style.animationPlayState = 'running';
      });
      if (title) (title as HTMLElement).style.animationPlayState = 'running';
      if (text) (text as HTMLElement).style.animationPlayState = 'running';
      setAnimationsPaused(false);
    } else {
      particles.forEach(particle => {
        (particle as HTMLElement).style.animationPlayState = 'paused';
      });
      if (title) (title as HTMLElement).style.animationPlayState = 'paused';
      if (text) (text as HTMLElement).style.animationPlayState = 'paused';
      setAnimationsPaused(true);
    }
  };

  const changeColors = () => {
    const colors = [
      ['#ff6b6b', '#ff8e8e'],
      ['#4ecdc4', '#6ee8df'],
      ['#45b7d1', '#74c7ec'],
      ['#96ceb4', '#a8dba8'],
      ['#feca57', '#ff9ff3'],
      ['#ff9ff3', '#54a0ff'],
      ['#5f27cd', '#741b47'],
      ['#00d2d3', '#ff9f43']
    ];
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    document.querySelectorAll('.loading-particle').forEach(particle => {
      (particle as HTMLElement).style.background = `radial-gradient(circle, ${randomColor[0]}, ${randomColor[1]})`;
      (particle as HTMLElement).style.boxShadow = `0 0 15px ${randomColor[0]}80`;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-emerald-900">
      <style jsx>{`
        .loading-title {
          font-size: 2.5rem;
          margin-bottom: 50px;
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 4px 8px rgba(0,0,0,0.3);
          animation: titleGlow 3s ease-in-out infinite alternate;
        }

        @keyframes titleGlow {
          0% { filter: drop-shadow(0 0 5px rgba(255, 107, 107, 0.5)); }
          100% { filter: drop-shadow(0 0 20px rgba(69, 183, 209, 0.8)); }
        }

        .particle-container {
          display: flex;
          justify-content: center;
          gap: 60px;
          flex-wrap: wrap;
          margin-bottom: 50px;
        }

        .particle-loader {
          width: 200px;
          height: 200px;
          position: relative;
        }

        .loader-label {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.8);
          white-space: nowrap;
        }

        .convergence .loading-particle {
          position: absolute;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, #ff6b6b, #ff8e8e);
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(255, 107, 107, 0.6);
        }

        .convergence .loading-particle:nth-child(1) { animation: converge1 3s ease-in-out infinite; }
        .convergence .loading-particle:nth-child(2) { animation: converge2 3s ease-in-out infinite 0.2s; }
        .convergence .loading-particle:nth-child(3) { animation: converge3 3s ease-in-out infinite 0.4s; }
        .convergence .loading-particle:nth-child(4) { animation: converge4 3s ease-in-out infinite 0.6s; }
        .convergence .loading-particle:nth-child(5) { animation: converge5 3s ease-in-out infinite 0.8s; }
        .convergence .loading-particle:nth-child(6) { animation: converge6 3s ease-in-out infinite 1s; }
        .convergence .loading-particle:nth-child(7) { animation: converge7 3s ease-in-out infinite 1.2s; }
        .convergence .loading-particle:nth-child(8) { animation: converge8 3s ease-in-out infinite 1.4s; }

        @keyframes converge1 {
          0%, 100% { transform: translate(20px, 20px) scale(0.5); opacity: 0.3; }
          50% { transform: translate(96px, 96px) scale(1.5); opacity: 1; }
        }
        @keyframes converge2 {
          0%, 100% { transform: translate(180px, 20px) scale(0.5); opacity: 0.3; }
          50% { transform: translate(96px, 96px) scale(1.5); opacity: 1; }
        }
        @keyframes converge3 {
          0%, 100% { transform: translate(180px, 180px) scale(0.5); opacity: 0.3; }
          50% { transform: translate(96px, 96px) scale(1.5); opacity: 1; }
        }
        @keyframes converge4 {
          0%, 100% { transform: translate(20px, 180px) scale(0.5); opacity: 0.3; }
          50% { transform: translate(96px, 96px) scale(1.5); opacity: 1; }
        }
        @keyframes converge5 {
          0%, 100% { transform: translate(100px, 10px) scale(0.5); opacity: 0.3; }
          50% { transform: translate(96px, 96px) scale(1.5); opacity: 1; }
        }
        @keyframes converge6 {
          0%, 100% { transform: translate(190px, 100px) scale(0.5); opacity: 0.3; }
          50% { transform: translate(96px, 96px) scale(1.5); opacity: 1; }
        }
        @keyframes converge7 {
          0%, 100% { transform: translate(100px, 190px) scale(0.5); opacity: 0.3; }
          50% { transform: translate(96px, 96px) scale(1.5); opacity: 1; }
        }
        @keyframes converge8 {
          0%, 100% { transform: translate(10px, 100px) scale(0.5); opacity: 0.3; }
          50% { transform: translate(96px, 96px) scale(1.5); opacity: 1; }
        }

        .orbital .loading-particle {
          position: absolute;
          width: 10px;
          height: 10px;
          background: radial-gradient(circle, #4ecdc4, #6ee8df);
          border-radius: 50%;
          box-shadow: 0 0 15px rgba(78, 205, 196, 0.8);
        }

        .orbital .loading-particle:nth-child(1) { animation: orbit1 4s linear infinite; }
        .orbital .loading-particle:nth-child(2) { animation: orbit2 4s linear infinite; }
        .orbital .loading-particle:nth-child(3) { animation: orbit3 4s linear infinite; }
        .orbital .loading-particle:nth-child(4) { animation: orbit4 4s linear infinite; }
        .orbital .loading-particle:nth-child(5) { animation: orbit5 3s linear infinite; }
        .orbital .loading-particle:nth-child(6) { animation: orbit6 3s linear infinite; }

        @keyframes orbit1 {
          0% { transform: translate(100px, 50px) rotate(0deg) translateX(50px) rotate(0deg); }
          100% { transform: translate(100px, 50px) rotate(360deg) translateX(50px) rotate(-360deg); }
        }
        @keyframes orbit2 {
          0% { transform: translate(100px, 50px) rotate(60deg) translateX(50px) rotate(-60deg); }
          100% { transform: translate(100px, 50px) rotate(420deg) translateX(50px) rotate(-420deg); }
        }
        @keyframes orbit3 {
          0% { transform: translate(100px, 50px) rotate(120deg) translateX(50px) rotate(-120deg); }
          100% { transform: translate(100px, 50px) rotate(480deg) translateX(50px) rotate(-480deg); }
        }
        @keyframes orbit4 {
          0% { transform: translate(100px, 50px) rotate(180deg) translateX(50px) rotate(-180deg); }
          100% { transform: translate(100px, 50px) rotate(540deg) translateX(50px) rotate(-540deg); }
        }
        @keyframes orbit5 {
          0% { transform: translate(100px, 50px) rotate(0deg) translateX(80px) rotate(0deg); }
          100% { transform: translate(100px, 50px) rotate(-360deg) translateX(80px) rotate(360deg); }
        }
        @keyframes orbit6 {
          0% { transform: translate(100px, 50px) rotate(180deg) translateX(80px) rotate(-180deg); }
          100% { transform: translate(100px, 50px) rotate(-180deg) translateX(80px) rotate(180deg); }
        }

        .explosion .loading-particle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: radial-gradient(circle, #45b7d1, #74c7ec);
          border-radius: 50%;
          box-shadow: 0 0 12px rgba(69, 183, 209, 0.7);
          left: 50%;
          top: 50%;
          transform-origin: 0 0;
        }

        .explosion .loading-particle:nth-child(1) { animation: explode1 2.5s ease-out infinite; }
        .explosion .loading-particle:nth-child(2) { animation: explode2 2.5s ease-out infinite 0.1s; }
        .explosion .loading-particle:nth-child(3) { animation: explode3 2.5s ease-out infinite 0.2s; }
        .explosion .loading-particle:nth-child(4) { animation: explode4 2.5s ease-out infinite 0.3s; }
        .explosion .loading-particle:nth-child(5) { animation: explode5 2.5s ease-out infinite 0.4s; }
        .explosion .loading-particle:nth-child(6) { animation: explode6 2.5s ease-out infinite 0.5s; }
        .explosion .loading-particle:nth-child(7) { animation: explode7 2.5s ease-out infinite 0.6s; }
        .explosion .loading-particle:nth-child(8) { animation: explode8 2.5s ease-out infinite 0.7s; }
        .explosion .loading-particle:nth-child(9) { animation: explode9 2.5s ease-out infinite 0.8s; }
        .explosion .loading-particle:nth-child(10) { animation: explode10 2.5s ease-out infinite 0.9s; }

        @keyframes explode1 { 0% { transform: translate(0, 0) scale(1); opacity: 1; } 100% { transform: translate(80px, 0px) scale(0); opacity: 0; } }
        @keyframes explode2 { 0% { transform: translate(0, 0) scale(1); opacity: 1; } 100% { transform: translate(60px, 60px) scale(0); opacity: 0; } }
        @keyframes explode3 { 0% { transform: translate(0, 0) scale(1); opacity: 1; } 100% { transform: translate(0px, 80px) scale(0); opacity: 0; } }
        @keyframes explode4 { 0% { transform: translate(0, 0) scale(1); opacity: 1; } 100% { transform: translate(-60px, 60px) scale(0); opacity: 0; } }
        @keyframes explode5 { 0% { transform: translate(0, 0) scale(1); opacity: 1; } 100% { transform: translate(-80px, 0px) scale(0); opacity: 0; } }
        @keyframes explode6 { 0% { transform: translate(0, 0) scale(1); opacity: 1; } 100% { transform: translate(-60px, -60px) scale(0); opacity: 0; } }
        @keyframes explode7 { 0% { transform: translate(0, 0) scale(1); opacity: 1; } 100% { transform: translate(0px, -80px) scale(0); opacity: 0; } }
        @keyframes explode8 { 0% { transform: translate(0, 0) scale(1); opacity: 1; } 100% { transform: translate(60px, -60px) scale(0); opacity: 0; } }
        @keyframes explode9 { 0% { transform: translate(0, 0) scale(1); opacity: 1; } 100% { transform: translate(100px, 30px) scale(0); opacity: 0; } }
        @keyframes explode10 { 0% { transform: translate(0, 0) scale(1); opacity: 1; } 100% { transform: translate(-100px, -30px) scale(0); opacity: 0; } }

        .loading-text {
          margin-top: 30px;
          font-size: 1.2rem;
          opacity: 0;
          animation: fadeInOut 3s ease-in-out infinite;
          color: white;
        }

        @keyframes fadeInOut {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }

        .controls {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
          margin-top: 40px;
        }

        .btn {
          background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.2));
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 12px 24px;
          border-radius: 25px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .btn:hover {
          background: linear-gradient(45deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.3));
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }

        @media (max-width: 768px) {
          .particle-container {
            flex-direction: column;
            align-items: center;
            gap: 40px;
          }
          
          .particle-loader {
            width: 150px;
            height: 150px;
          }
          
          .loading-title {
            font-size: 2rem;
          }
        }
      `}</style>

      <div className="text-center relative">
        <h1 className="loading-title">✨ Babblers Tours ✨</h1>
        
        <div className="particle-container">
          {/* Convergence Pattern */}
          <div className="particle-loader convergence">
            <div className="loading-particle"></div>
            <div className="loading-particle"></div>
            <div className="loading-particle"></div>
            <div className="loading-particle"></div>
            <div className="loading-particle"></div>
            <div className="loading-particle"></div>
            <div className="loading-particle"></div>
            <div className="loading-particle"></div>
            <div className="loader-label">Convergence</div>
          </div>

          {/* Orbital Pattern */}
          <div className="particle-loader orbital">
            <div className="loading-particle"></div>
            <div className="loading-particle"></div>
            <div className="loading-particle"></div>
            <div className="loading-particle"></div>
            <div className="loading-particle"></div>
            <div className="loading-particle"></div>
            <div className="loader-label">Orbital</div>
          </div>

          {/* Explosion Pattern */}
          <div className="particle-loader explosion">
            <div className="loading-particle"></div>
            <div className="loading-particle"></div>
            <div className="loading-particle"></div>
            <div className="loading-particle"></div>
            <div className="loading-particle"></div>
            <div className="loading-particle"></div>
            <div className="loading-particle"></div>
            <div className="loading-particle"></div>
            <div className="loading-particle"></div>
            <div className="loading-particle"></div>
            <div className="loader-label">Explosion</div>
          </div>
        </div>

        <div className="loading-text">{loadingText}</div>

        <div className="controls">
          <button className="btn" onClick={toggleAnimations}>
            {animationsPaused ? '▶️ Resume' : '⏸️ Pause'}
          </button>
          <button className="btn" onClick={changeColors}>🎨 Random Colors</button>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;