import { useState } from "react";

function PhotoFrame({
  src,
  trim = 4,
  focus = 50,
  fixedRatio,
  fill = false,
  onRatio,
}) {
  const [ratio, setRatio] = useState(null);

  const handleLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    const keep = 1 - (trim * 2) / 100;
    const shape = naturalWidth / (naturalHeight * keep);

    if (!fixedRatio) setRatio(shape);
    onRatio?.(shape);
  };

  const useRatio = fixedRatio || ratio;

  let frameStyle;
  if (useRatio) {
    frameStyle = { aspectRatio: String(useRatio) };
    if (!fill && !fixedRatio) {
      frameStyle.width = `min(100%, 340px, calc(70vh * ${useRatio}))`;
    }
  }

  return (
    <div className="photo-frame" style={frameStyle}>
      <img
        src={src}
        alt="Groom and bride"
        className="photo-img"
        style={{ objectPosition: `center ${focus}%` }}
        onLoad={handleLoad}
      />
    </div>
  );
}

export default PhotoFrame;