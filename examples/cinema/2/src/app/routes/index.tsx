import { createFileRoute } from "@tanstack/react-router";
import { MainPage } from "@/pages/MainPage/MainPage";
import { queryClient } from "@/api/query-client";
import { getFilmsQueryOptions } from "@/api/requests/films/getFilmsQueryOptions";

export const Route = createFileRoute("/")({
  loader: () => {
    console.log(queryClient.getQueryCache());
    queryClient.ensureQueryData(getFilmsQueryOptions);
  },
  component: MainPage,
});
