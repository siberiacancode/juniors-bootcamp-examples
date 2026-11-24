import { createFileRoute } from "@tanstack/react-router";
import { MoviePage } from "@/pages/MoviePage/MoviePage";
import { queryClient } from "@/api/query-client";
import { getFilmQueryOptions } from "@/api/requests/film/id/getFilmQueryOptions";

export const Route = createFileRoute("/movie/$id")({
  loader: ({ params }) => {
    console.log(queryClient.getQueryCache());
    queryClient.ensureQueryData(getFilmQueryOptions(params.id));
  },
  component: MoviePage,
});
