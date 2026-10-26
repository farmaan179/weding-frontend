import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Reveal from "../components/Reveal";
import GateScreen from "../components/GateScreen";
import HeroSlide from "../components/slides/HeroSlide";
import ScratchSlide from "../components/slides/ScratchSlide";
import VerseSlide from "../components/slides/VerseSlide";
import NikkahSlide from "../components/slides/NikkahSlide";
import ParentsSlide from "../components/slides/ParentsSlide";
import SaveTheDateSlide from "../components/slides/SaveTheDateSlide";
import CountdownSlide from "../components/slides/CountdownSlide";
import CoupleNamesSlide from "../components/slides/CoupleNamesSlide";
import VenueSlide from "../components/slides/VenueSlide";
import DuaSlide from "../components/slides/DuaSlide";
import ComplimentsSlide from "../components/slides/ComplimentsSlide";

// Picture on the gate doors. It is split in the middle and opens both sides.
const GATE_IMAGE = "/backgrounds/gate.jpg";

// ONE photo for the whole first page. Use "" for the starry sky instead.
const HERO_PHOTO = "/backgrounds/hero.jpg";

// Which part of the photo stays when it has to be cut.
// "center bottom" keeps the bottom and cuts the top.
const HERO_POSITION = "center bottom";

// Photos for the next pages. Use "" to skip a page.
const SECOND_PHOTO = "/photos/page2.png"; // Scratch to Reveal
const THIRD_PHOTO = "/photos/page3.png"; // Save the Date calendar
const FOURTH_PHOTO = "/photos/page4.png"; // Countdown
const FIFTH_PHOTO = "/photos/page5.png"; // Date, time and venue
const SIXTH_PHOTO = "/photos/page6.png"; // Parents
const SEVENTH_PHOTO = SECOND_PHOTO; // Verse repeats the second page photo
const EIGHTH_PHOTO = "/photos/page8.png"; // Qubool Hai
const NINTH_PHOTO = THIRD_PHOTO; // NEW: Couple repeats the third page photo
const TENTH_PHOTO = SECOND_PHOTO; // NEW: Dua repeats the second page photo
const ELEVENTH_PHOTO = THIRD_PHOTO; // NEW: Compliments repeats the third page photo

// Background pictures for the other sections. "" means colour background.
const BG = {
  cream: "",
};

function InvitationPage({ preview = false }) {
  const { code } = useParams();
  const [guest, setGuest] = useState(null);
  const [wedding, setWedding] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const weddingRes = await api.get("/wedding");
        setWedding(weddingRes.data);

        if (preview) {
          setGuest({ name: "Ahmed Khan", withText: "With Family" });
        } else {
          const guestRes = await api.get(`/guests/open/${code}`);
          setGuest(guestRes.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Could not load invitation");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [code, preview]);

  const handleStart = () => {
    setStarted(true);
    audioRef.current?.play().catch(() => {});
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  if (loading) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-5 text-danger">{error}</p>;
  }

  const slides = [
    {
      theme: "night",
      photo: HERO_PHOTO,
      content: <HeroSlide wedding={wedding} guest={guest} />,
    },
    {
      photo: SECOND_PHOTO,
      position: "center",
      shade: "light",
      content: <ScratchSlide wedding={wedding} />,
    },
    {
      photo: THIRD_PHOTO,
      position: "center",
      shade: "light",
      content: <SaveTheDateSlide wedding={wedding} />,
    },
    {
      photo: FOURTH_PHOTO,
      position: "center",
      shade: "light",
      content: <CountdownSlide wedding={wedding} />,
    },
    {
      photo: FIFTH_PHOTO,
      position: "center",
      shade: "light",
      content: <VenueSlide wedding={wedding} />,
    },
    {
      photo: SIXTH_PHOTO,
      position: "center",
      shade: "light",
      content: <ParentsSlide wedding={wedding} />,
    },
    {
      photo: SEVENTH_PHOTO,
      position: "center",
      shade: "light",
      content: <VerseSlide wedding={wedding} />,
    },
    {
      photo: EIGHTH_PHOTO,
      position: "center",
      shade: "light",
      content: <NikkahSlide wedding={wedding} />,
    },
    // NEW: couple page with page3 photo
    {
      photo: NINTH_PHOTO,
      position: "center",
      shade: "light",
      content: <CoupleNamesSlide wedding={wedding} />,
    },
    // NEW: dua page with page2 photo
    {
      photo: TENTH_PHOTO,
      position: "center",
      shade: "light",
      content: <DuaSlide wedding={wedding} />,
    },
    // NEW: compliments page with page3 photo
    {
      photo: ELEVENTH_PHOTO,
      position: "center",
      shade: "light",
      content: <ComplimentsSlide wedding={wedding} />,
    },
  ];

  return (
    <>
      <audio ref={audioRef} src="/music/nikah.mp3" loop />

      <GateScreen guest={guest} onOpen={handleStart} image={GATE_IMAGE} />

      {started && (
        <>
          <div className="scroll-page">
            {slides.map((slide, index) => (
              <section
                key={index}
                className={`scroll-section ${slide.theme || ""} ${
                  slide.bg ? "has-bg" : ""
                }`}
                style={
                  slide.bg ? { "--bg-img": `url(${slide.bg})` } : undefined
                }
              >
                {slide.photo && (
                  <>
                    <img
                      className="hero-photo"
                      src={slide.photo}
                      alt=""
                      style={{
                        objectPosition: slide.position || HERO_POSITION,
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <div
                      className={
                        slide.shade === "light" ? "hero-shade light" : "hero-shade"
                      }
                    ></div>
                  </>
                )}
                <Reveal>{slide.content}</Reveal>
              </section>
            ))}
          </div>
          <button className="music-btn" onClick={toggleMute}>
            {muted ? "🔇" : "🔊"}
          </button>
        </>
      )}
    </>
  );
}

export default InvitationPage;