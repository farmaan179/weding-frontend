import { useState } from "react";

function GateScreen({ guest, onOpen, image, photo }) {
  const [opening, setOpening] = useState(false);
  const [hidden, setHidden] = useState(false);

  const handleTap = () => {
    if (opening) return;
    setOpening(true);
    onOpen();
    setTimeout(() => setHidden(true), 1800);
  };

  if (hidden) return null;

  const classes = ["gate"];
  if (image) classes.push("has-image");
  if (opening) classes.push("open");

  return (
    <div
      className={classes.join(" ")}
      style={image ? { "--gate-img": `url(${image})` } : undefined}
      onClick={handleTap}
    >
      <div className="gate-door left"></div>
      <div className="gate-door right"></div>

      <div className="gate-center">
        <div className="gate-text">
          {photo ? (
            <img src={photo} alt="Groom and bride" className="gate-photo" />
          ) : (
            !image && <div className="gate-bow">🎀</div>
          )}
          <p className="gate-dear">Dear</p>
          <h2 className="script-name gate-name">{guest.name}</h2>
          {guest.withText && <p className="gate-with">{guest.withText}</p>}
        </div>

        <p className="gate-hint">Tap to open</p>
      </div>
    </div>
  );
}

export default GateScreen;