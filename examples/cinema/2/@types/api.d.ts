interface Person {
  id: string;
  professions: string[];
  fullName: string;
  photo: string;
}

interface Film {
  id: string;
  name: string;
  originalName: string;
  description: string;
  releaseDate: string;
  actors: Person[];
  directors: Person[];
  runtime: number;
  ageRating: string;
  genres: string[];
  userRatings: {
    kinopoisk: string;
    imdb: string;
  };
  img: string;
  country: {
    name: string;
    code: string;
    code2: string;
    id: number;
  };
}

type FilmResponse = { film: Film; success: boolean; reason?: string };
type FilmsResponse = { films: Film[]; success: boolean; reason?: string };
