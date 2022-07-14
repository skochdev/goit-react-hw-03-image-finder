type Props = {
  id: number;
  webformatURL: string;
  largeImageURL: string;
  alt: string;
};

function ImageGalleryItem({ webformatURL, id, largeImageURL, alt }: Props) {
  return (
    <li className="ImageGalleryItem">
      <img src={webformatURL} alt={alt} className="ImageGalleryItemImage" />
    </li>
  );
}

export default ImageGalleryItem;
