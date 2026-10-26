function ParentsSlide({ wedding }) {
  return (
    <div className="slide-content">
      <p className="small">WITH THE BLESSINGS OF ALMIGHTY ALLAH</p>
      <h5 className="gold">{wedding.parentsLine}</h5>
      <p className="small">REQUEST THE HONOUR OF YOUR PRESENCE AT THE</p>

      <h3 className="script-name">Nikah Ceremony</h3>
      <p className="small">OF OUR BELOVED DAUGHTER</p>

      <h2 className="script-name red">{wedding.brideName}</h2>
      <p className="script-name">With</p>
      <h2 className="script-name red">{wedding.groomName}</h2>
      <p className="small">{wedding.groomFatherLine}</p>
    </div>
  );
}

export default ParentsSlide;