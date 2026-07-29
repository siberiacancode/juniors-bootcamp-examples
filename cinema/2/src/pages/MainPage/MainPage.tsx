import styles from "./MainPage.module.css";
import { BottomNavigation } from "@/shared/ui/BottomNavigation/BottomNavigation";
import { Title } from "@mantine/core";
import { FilmsGrid } from "./FilmsGrid/FilmsGrid";
import { useQuery } from "@tanstack/react-query";
import { getFilmsQueryOptions } from "@/api/requests/films/getFilmsQueryOptions";

export const MainPage = () => {
  const { data, isLoading } = useQuery(getFilmsQueryOptions);

  return (
    <div className={styles.container}>
      {isLoading && <Title>Loading</Title>}
      {data &&
        data.map((chunk, index) => <FilmsGrid chunk={chunk} key={index} />)}
      <BottomNavigation />
    </div>
  );
};
