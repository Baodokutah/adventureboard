import React, { useEffect, useRef } from 'react';
import './404.css'

const Snow404 = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let particles = [];

    const Particle = function() {
      this.x = this.y = this.dx = this.dy = 0;
      this.reset();
    }

    Particle.prototype.reset = function() {
      this.y = Math.random() * height;
      this.x = Math.random() * width;
      this.dx = (Math.random() * 1) - 0.5;
      this.dy = (Math.random() * 0.5) + 0.5;
    }

    function createParticles(count) {
      if (count !== particles.length) {
        particles = [];
        for (let i = 0; i < count; i++) {
          particles.push(new Particle());
        }
      }
    }

    function onResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      createParticles((width * height) / 10000);
    }

    function updateParticles() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#f6f9fa';

      particles.forEach(function(particle) {
        particle.y += particle.dy;
        particle.x += particle.dx;

        if (particle.y > height) {
          particle.y = 0;
        }

        if (particle.x > width) {
          particle.reset();
          particle.y = 0;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 5, 0, Math.PI * 2, false);
        ctx.fill();
      });

      window.requestAnimationFrame(updateParticles);
    }

    onResize();
    updateParticles();

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className='snow404'>
    <div className="snow-content">
      <canvas className="snow" ref={canvasRef}></canvas>
      <div className="main-text">
        <h1>Đường dẫn bạn đang tìm</h1>
        <h2>không tồn tại</h2>
        <h4>Merry Christmas btw :3</h4>
        <a className="home-link" href="/">Trở về trang chủ</a>
      </div>
      <div className="ground">
        <div className="mound"> 
          <div className="mound_text">404</div>
          <div className="mound_spade"></div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Snow404;