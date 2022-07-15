const PIXABAY_KEY = '25942332-704865a59830ef544b91ef743';

function fetchImages(searchQuery: string, page = 1) {
  return fetch(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${PIXABAY_KEY}&image_type=photo&orientation=horizontal&per_page=12`
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
