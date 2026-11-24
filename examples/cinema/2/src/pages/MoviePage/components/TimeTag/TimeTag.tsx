import { Image, Text, UnstyledButton } from "@mantine/core";
import styles from "./TimeTag.module.css";
import ChestIcon from "@/assets/icons/chest-icon.png";

interface TimeTagProps {
  time: string;
  isActive: boolean;
}

export const TimeTag = ({ time, isActive }: TimeTagProps) => {
  return (
    <UnstyledButton
      className={`${styles.tag} ${isActive ? styles.activeTag : ""}`}
    >
      <Text className={styles.time}>{time}</Text>

      {isActive && <Image src={ChestIcon} w={20} h={20} />}
    </UnstyledButton>
  );
};
