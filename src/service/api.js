function fetchImage(url) {
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`Нет изображений с запросом ${this.state.pictureName}`),
    );
  });
}

export default fetchImage;
