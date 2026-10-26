function ComplimentsSlide({ wedding }) {
  return (
    <div className="slide-content">
      <h2 className="script-name">With Best Compliments from</h2>
      <h4 className="red mt-4">{wedding.complimentsFrom}</h4>

      <p className="arabic mt-5">بارك الله لك وبارك عليك وجمع بينكما في خير</p>
      <p className="script-name">
        May Allah bless you, shower His blessings upon you and unite you both in goodness.
      </p>
    </div>
  );
}

export default ComplimentsSlide;