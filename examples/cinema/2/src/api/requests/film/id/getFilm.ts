import { api } from "@/api/instance";

export const getFilm = (filmId: string) => {
  return api.get<FilmResponse>(`/film/${filmId}`);
};
