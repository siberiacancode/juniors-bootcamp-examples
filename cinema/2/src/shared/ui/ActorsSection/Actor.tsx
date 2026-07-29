import { Avatar, Stack, Title } from "@mantine/core";
import styles from "./ActorsSection.module.css";

interface ActorProps {
  photo: string;
  fullName: string;
}

export const ActorComponent = ({ photo, fullName }: ActorProps) => {
  return (
    <Stack className={styles.actor} align="center" gap={4}>
      <Avatar src={photo} w={72} radius="xl" className={styles.photo} />
      <Title
        className={styles.actorName}
        fw={400}
        c={"#969696"}
        style={{ textAlign: "center" }}
      >
        {fullName}
      </Title>
    </Stack>
  );
};
