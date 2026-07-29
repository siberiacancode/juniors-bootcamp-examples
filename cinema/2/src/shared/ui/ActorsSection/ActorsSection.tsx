import { Group, Stack, Title } from "@mantine/core";
import styles from "./ActorsSection.module.css";
import { ActorComponent } from "./Actor";

interface ActorSectionProps {
  actors: Person[];
}

export const ActorsSection = ({ actors }: ActorSectionProps) => {
  return (
    <Stack className={styles.actorsSection}>
      <Title className={styles.title}>Актёры</Title>
      <Group align="start" gap={8} wrap="nowrap">
        {actors.slice(0, 4).map((actor) => (
          <ActorComponent
            key={actor.id}
            photo={`https://juniorsbootcamp.ru/api${actor.photo}`}
            fullName={actor.fullName}
          />
        ))}
      </Group>
    </Stack>
  );
};
