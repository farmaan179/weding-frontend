import { useState } from "react";
import PhotoFrame from "../PhotoFrame";

function CoupleNamesSlide({ wedding }) {
  const [first, second] = wedding.couplePhotos || [];
  const [firstShape, setFirstShape] = useState(null);

  return (
    <div className="slide-content">
      <p>The Nikkah of</p>
      <h2 className="script-name">{wedding.brideName}</h2>
      <p className="my-1 fs-3 gold">&amp;</p>
      <h2 className="script-name">{wedding.groomName}</h2>

      {first || second ? (
        <div className="photo-pair">
          {first && (
            <PhotoFrame src={first} trim={4} fill onRatio={setFirstShape} />
          )}
          {second && (
            <PhotoFrame src={second} fixedRatio={firstShape || "3 / 4"} fill />
          )}
        </div>
      ) : (
        <p className="mt-4 fs-1">🤍</p>
      )}
    </div>
  );
}

export default CoupleNamesSlide;