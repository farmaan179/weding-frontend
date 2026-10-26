function HeroSlide({ wedding, guest }) {
  const moonPhoto = wedding.moonPhoto || wedding.couplePhotos?.[0];

  return (
    <div className="slide-content hero">
      <p className="hero-dear">Dear {guest.name}</p>

      <div className={moonPhoto ? "moon moon-photo" : "moon"}>
        {moonPhoto && <img src={moonPhoto} alt="Bride and groom" />}
      </div>

      <p className="hero-small">We&apos;re getting married</p>
      <div className="hero-line"></div>

      <h1 className="hero-name">{wedding.brideName}</h1>
      <p className="hero-parents">Daughter of {wedding.parentsLine}</p>

      <p className="hero-and">&amp;</p>

      <h1 className="hero-name">{wedding.groomName}</h1>
      <p className="hero-parents">{wedding.groomFatherLine}</p>

      <p className="hero-scroll">
        SCROLL
        <span className="hero-arrow">⌄</span>
      </p>
    </div>
  );
}

export default HeroSlide;

