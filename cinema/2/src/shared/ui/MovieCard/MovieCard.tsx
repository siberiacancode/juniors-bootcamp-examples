import styles from "./MovieCard.module.css";
import type { ReactNode } from "react";
import { Image, Box, Title, Paper, Text } from "@mantine/core";
import { ActorsSection } from "@/shared/ui/ActorsSection/ActorsSection";

interface MovieCardProps {
  film: Film;
  children?: ReactNode;
  showDescription?: boolean;
  showActors?: boolean;
}

export const MovieCard = ({
  film,
  children,
  showDescription,
  showActors,
}: MovieCardProps) => {
  return (
    <Paper w="100%" className={styles.movieCard}>
      <Image
        className={styles.poster}
        src={`https://juniorsbootcamp.ru/api${film.img}`}
        radius={24}
      />
      <Box>
        <Title className={styles.title} order={1}>
          {film.name}
        </Title>
        <Title className={styles.genre} order={2}>
          {film.genres.join(", ")}
        </Title>
      </Box>
      {showDescription && <Text>{film.description}</Text>}
      {showActors && film.actors && <ActorsSection actors={film.actors} />}
      {children}
    </Paper>
  );
};
