function VenueSlide({ wedding }) {
  const [year, month, day] = wedding.eventDate.split("-").map(Number);

  const fullDate = new Date(year, month - 1, day).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="slide-content">
      <p className="arabic">إن شاء الله</p>

      <p className="mb-1">📅</p>
      <h4 className="red">{fullDate}</h4>

      <p className="mt-4 mb-1">🕐</p>
      <h5 className="red">NIKAH:</h5>
      <p>{wedding.nikahTime}</p>

      <p className="mt-4 mb-1">📍</p>
      <h5 className="red">{wedding.venueName}</h5>
      <p>{wedding.venueCity}</p>

      {wedding.mapLink && (
        <a
          className="btn btn-outline-danger btn-sm"
          href={wedding.mapLink}
          target="_blank"
          rel="noreferrer"
        >
          Open in Maps
        </a>
      )}
    </div>
  );
}

export default VenueSlide;