import ImageGalleryItem from '../ImageGalleryItem';

interface Props {
  searchResults: {
    webformatURL: string;
    largeImageURL: string;
    id: number;
    tags: string;
  }[];
}

function ImageGalleryItemsList({ searchResults }: Props) {
  return (
    <>
      {searchResults.length > 0 && (
        <ul className="ImageGallery">
          {searchResults.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              id={id}
              alt={tags}
              key={id}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default ImageGalleryItemsList;
