import Divider from "../Divider";

function IntroSlide({ wedding, guest }) {
  return (
    <div className="slide-content">
      <p className="arabic">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
      <h1 className="script-title">{wedding.title}</h1>

      <Divider />

      <p className="mb-1">Dear</p>
      <h3 className="script-name">{guest.name}</h3>
      {guest.withText && <p>{guest.withText}</p>}
    </div>
  );
}

export default IntroSlide;