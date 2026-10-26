import { useEffect, useRef, useState } from "react";
import ScratchCard from "../ScratchCard";
import Divider from "../Divider";

const FALLING = Array.from({ length: 10 }, (_, i) => ({
  left: 5 + i * 9.5,
  delay: (i % 5) * 1.3,
  duration: 7 + (i % 4) * 1.5,
  size: 10 + (i % 3) * 4,
}));

const SPARKS = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2;
  return { dx: Math.cos(angle) * 120, dy: Math.sin(angle) * 90 };
});

const escapeText = (text) => String(text).replace(/([,;])/g, "\\$1");
const pad = (n) => String(n).padStart(2, "0");

function ScratchSlide({ wedding }) {
  const [revealed, setRevealed] = useState(false);
  const detailsRef = useRef(null);

  const [year, month, day] = wedding.eventDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  const weekday = date.toLocaleDateString("en-GB", { weekday: "long" });
  const monthYear = date.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysLeft = Math.round((date - today) / 86400000);

  useEffect(() => {
    if (!revealed) return;

    const timer = setTimeout(() => {
      detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 1400);

    return () => clearTimeout(timer);
  }, [revealed]);

  const handleAddToCalendar = () => {
    const start = `${year}${pad(month)}${pad(day)}`;
    const next = new Date(year, month - 1, day + 1);
    const end = `${next.getFullYear()}${pad(next.getMonth() + 1)}${pad(next.getDate())}`;
    const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    const place = [wedding.venueName, wedding.venueAddress, wedding.venueCity]
      .filter(Boolean)
      .join(", ");

    const lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Nikah Invitation//EN",
      "BEGIN:VEVENT",
      `UID:nikah-${start}@invitation`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${start}`,
      `DTEND;VALUE=DATE:${end}`,
     `SUMMARY:${escapeText(`Nikah of ${wedding.brideName} & ${wedding.groomName}`)}`,
      `LOCATION:${escapeText(place)}`,
      `DESCRIPTION:${escapeText(wedding.nikahTime)}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ];

    const blob = new Blob([lines.join("\r\n")], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "nikah-invitation.ics";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="slide-content scratch-slide">
      <div className="petals">
        {FALLING.map((p, i) => (
          <span
            key={i}
            className="petal"
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="scratch-body">
        <p className="scratch-kicker">✦ A SPECIAL DAY ✦</p>
        <h2 className="script-title">Scratch to Reveal</h2>
        <Divider />
        <p className="scratch-note">
          Scratch the silver card to see our wedding date
        </p>

        <div className="scratch-wrap">
          <ScratchCard onReveal={() => setRevealed(true)}>
            <p className="scratch-weekday">{weekday}</p>
            <p className="scratch-day">{day}</p>
            <p className="scratch-month">{monthYear}</p>
            <p className="scratch-time">{wedding.nikahTime}</p>
          </ScratchCard>

          {revealed && (
            <div className="sparks">
              {SPARKS.map((s, i) => (
                <span
                  key={i}
                  className="spark"
                  style={{ "--dx": `${s.dx}px`, "--dy": `${s.dy}px` }}
                >
                  ✦
                </span>
              ))}
            </div>
          )}
        </div>

        {!revealed && <p className="scratch-tip">Use your finger to scratch</p>}

        {revealed && (
          <div className="after-reveal" ref={detailsRef}>
            <p className="arabic insha">إن شاء الله</p>

            <div className="info-card">
              <span className="info-icon">🕌</span>
              <div>
                <p className="info-label">Nikah</p>
                <p className="info-value">{wedding.nikahTime}</p>
              </div>
            </div>

            <div className="info-card">
              <span className="info-icon">📍</span>
              <div>
                <p className="info-label">Venue</p>
                <p className="info-value">{wedding.venueName}</p>
                {wedding.venueAddress && (
                  <p className="info-address">{wedding.venueAddress}</p>
                )}
                {wedding.venueCity && (
                  <p className="info-address">{wedding.venueCity}</p>
                )}
              </div>
            </div>

            {daysLeft > 0 && (
              <div className="info-card">
                <span className="info-icon">⏳</span>
                <div>
                  <p className="info-label">Countdown</p>
                  <p className="info-value">{daysLeft} days to go</p>
                </div>
              </div>
            )}

            {daysLeft === 0 && (
              <div className="info-card">
                <span className="info-icon">🎉</span>
                <div>
                  <p className="info-label">Today</p>
                  <p className="info-value">Today is the big day!</p>
                </div>
              </div>
            )}

            <div className="info-actions">
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleAddToCalendar}
              >
                📅 Add to Calendar
              </button>
            </div>

            <p className="scroll-more">
              Scroll down for more
              <span className="hero-arrow">⌄</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ScratchSlide;