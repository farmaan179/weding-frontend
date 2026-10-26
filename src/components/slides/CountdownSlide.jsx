import { useEffect, useState } from "react";

function CountdownSlide({ wedding }) {
  const [year, month, day] = wedding.eventDate.split("-").map(Number);
  const target = new Date(year, month - 1, day).getTime();

  const getTimeLeft = () => {
    const diff = Math.max(target - Date.now(), 0);
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff / 3600000) % 24),
      minutes: Math.floor((diff / 60000) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [left, setLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const boxes = [
    ["Days", left.days],
    ["Hours", left.hours],
    ["Minutes", left.minutes],
    ["Seconds", left.seconds],
  ];

  return (
    <div className="slide-content">
      <h2 className="script-title">Counting the days</h2>

      <div className="countdown">
        {boxes.map(([label, value]) => (
          <div key={label} className="count-box">
            <div className="count-number">{value}</div>
            <div className="small">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountdownSlide;