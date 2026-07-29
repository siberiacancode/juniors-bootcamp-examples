import { api } from "@/api/instance";

export const getFilms = () => {
  return api.get<FilmsResponse>("/films");
};
