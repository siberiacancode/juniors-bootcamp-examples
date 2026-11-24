import styles from "./BottomNavigation.module.css";

import IconTicket from "@/assets/icons/ticket-icon.svg";
import IconMovie from "@/assets/icons/movie-icon.svg";
import IconUser from "@/assets/icons/user-icon.svg";

import { Paper } from "@mantine/core";
import { NavigationItem } from "./NavigationItem.tsx/NavigationItem";

export const BottomNavigation = () => {
  return (
    <Paper radius={999} withBorder className={styles.navigation}>
      <NavigationItem active iconSrc={IconMovie} label="Фильмы" />

      <NavigationItem iconSrc={IconTicket} label="Билеты" />

      <NavigationItem iconSrc={IconUser} label="Профиль" />
    </Paper>
  );
};
