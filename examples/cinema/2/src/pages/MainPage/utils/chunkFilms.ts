// Функция, которая делит массив фильмов на массивы по 12 штук для сетки

export const chunkFilms = (films: Film[]) => {
  const result = [];
  let chunk = [];

  for (let i = 0; i < films.length; i++) {
    if (chunk.length === 12) {
      result.push(chunk);
      chunk = [];
    }
    chunk.push(films[i]);
  }

  if (chunk) {
    result.push(chunk);
  }

  return result;
};
