import { queryOptions } from "@tanstack/react-query";
import { getFilm } from "./getFilm";

export const getFilmQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["film", id],
    queryFn: () => getFilm(id),
    staleTime: 1000 * 60 * 5,
  });
