import PhotoFrame from "../PhotoFrame";

function PhotoSlide({ wedding }) {
  const photo = wedding.couplePhotos?.[1];

  return (
    <div className="slide-content frame">
      <PhotoFrame src={photo} trim={0} />
    </div>
  );
}

export default PhotoSlide;