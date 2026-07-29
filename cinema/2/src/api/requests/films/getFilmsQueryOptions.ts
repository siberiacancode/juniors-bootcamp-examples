import { queryOptions } from "@tanstack/react-query";
import { chunkFilms } from "@/pages/MainPage/utils/chunkFilms";
import { getFilms } from "./getFilms";

export const getFilmsQueryOptions = queryOptions({
  queryKey: ["films"],
  queryFn: async () => {
    const data = await getFilms();
    return chunkFilms(data.data.films);
  },
  staleTime: 1000 * 60 * 5,
});
