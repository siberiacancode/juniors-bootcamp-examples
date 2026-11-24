import { Link } from "@tanstack/react-router";
import { MainButton } from "@/shared/ui/MainButton/MainButton";
import { MovieCard } from "@/shared/ui/MovieCard/MovieCard";
import styles from "./FilmsGrid.module.css";

interface FilmsGridProps {
  chunk: Film[];
}

export const FilmsGrid = ({ chunk }: FilmsGridProps) => {
  return (
    <>
      <div className={styles.firstRow}>
        {chunk.slice(0, 2).map((film) => (
          <MovieCard film={film} key={film.id}>
            <Link to="/movie/$id" params={{ id: film.id }}>
              {" "}
              <MainButton>Подробнее</MainButton>
            </Link>
          </MovieCard>
        ))}
      </div>
      <div className={styles.secondRow}>
        {chunk.slice(2, 6).map((film) => (
          <MovieCard film={film} key={film.id}>
            <Link to="/movie/$id" params={{ id: film.id }}>
              {" "}
              <MainButton>Подробнее</MainButton>
            </Link>
          </MovieCard>
        ))}
      </div>
      <div className={styles.firstRow}>
        {chunk.slice(6, 8).map((film) => (
          <MovieCard film={film} key={film.id} showActors>
            <Link to="/movie/$id" params={{ id: film.id }}>
              {" "}
              <MainButton>Подробнее</MainButton>
            </Link>
          </MovieCard>
        ))}
      </div>
      <div className={styles.secondRow}>
        {chunk.slice(8, 12).map((film) => (
          <MovieCard film={film} key={film.id}>
            <Link to="/movie/$id" params={{ id: film.id }}>
              {" "}
              <MainButton>Подробнее</MainButton>
            </Link>
          </MovieCard>
        ))}
      </div>
    </>
  );
};
