const PIXABAY_KEY = '25942332-704865a59830ef544b91ef743';

function fetchImages(searchQuery: string) {
  return fetch(
    `https://pixabay.com/api/?q=${searchQuery}&page=1&key=${PIXABAY_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(
        new Error(`Error when fetching the " ${searchQuery} "`)
      );
    }
  });
}

const searchApi = {
  fetchImages,
};

export default searchApi;
