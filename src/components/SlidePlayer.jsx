import { useEffect, useState } from "react";

function SlidePlayer({ slides, interval = 5000 }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [current, slides.length, interval]);

  const goNext = () => setCurrent((prev) => (prev + 1) % slides.length);
  const goPrev = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="player">
      <div className="slide" key={current}>
        {slides[current]}
      </div>

      <div className="tap-zone left" onClick={goPrev}></div>
      <div className="tap-zone right" onClick={goNext}></div>

      <div className="dots">
        {slides.map((_, index) => (
          <span key={index} className={index === current ? "dot active" : "dot"}></span>
        ))}
      </div>
    </div>
  );
}

export default SlidePlayer;