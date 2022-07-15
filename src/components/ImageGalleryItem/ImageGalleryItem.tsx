type Props = {
  id: number;
  webformatURL: string;
  largeImageURL: string;
  alt: string;
  onImgClick: () => void;
};

function ImageGalleryItem({
  webformatURL,
  id,
  largeImageURL,
  alt,
  onImgClick,
}: Props) {
  return (
    <li className="ImageGalleryItem" onClick={onImgClick}>
      <img src={webformatURL} alt={alt} className="ImageGalleryItemImage" />
    </li>
  );
}

export default ImageGalleryItem;
