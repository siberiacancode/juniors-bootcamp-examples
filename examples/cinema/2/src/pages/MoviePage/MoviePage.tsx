import { Group } from "@mantine/core";
import { DatesSection } from "./sections/DatesSection/DatesSection";
import { MovieSection } from "./sections/MovieSection/MovieSection";
import styles from "./MoviePage.module.css";

export const MoviePage = () => {
  return (
    <Group className={styles.page}>
      <DatesSection />
      <MovieSection />
    </Group>
  );
};
