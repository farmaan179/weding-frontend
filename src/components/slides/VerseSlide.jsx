function VerseSlide({ wedding }) {
  const verse = wedding.verses?.[0];

  return (
    <div className="slide-content">
      {verse?.arabic && <p className="arabic">{verse.arabic}</p>}
      <p className="script-name fs-4">"{verse?.translation}"</p>
      <p>{verse?.reference}</p>

      <h1 className="script-title mt-5">{wedding.initials}</h1>
    </div>
  );
}

export default VerseSlide;