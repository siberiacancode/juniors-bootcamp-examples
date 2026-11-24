import { MovieCard } from "@/shared/ui/MovieCard/MovieCard";
import styles from "./MovieSection.module.css";
import { Route } from "@/app/routes/movie.$id";
import { Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { getFilmQueryOptions } from "@/api/requests/film/id/getFilmQueryOptions";

export const MovieSection = () => {
  const { id } = Route.useParams();

  const { data, isLoading } = useQuery(getFilmQueryOptions(id));

  return (
    <div className={styles.section}>
      {isLoading && <Title>loading...</Title>}
      {data && <MovieCard film={data.data.film} showActors showDescription />}
    </div>
  );
};
