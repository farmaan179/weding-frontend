function DuaSlide({ wedding }) {
  const verse = wedding.verses?.[1];

  return (
    <div className="slide-content">
      {verse?.arabic && <p className="arabic">{verse.arabic}</p>}
      <p className="fs-5">"{verse?.translation}"</p>
    </div>
  );
}

export default DuaSlide;