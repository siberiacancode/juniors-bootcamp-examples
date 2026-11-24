import styles from "./NavigationItem.module.css";
import { Stack, UnstyledButton, Image, Text } from "@mantine/core";

interface NavigationItemProps {
  iconSrc: string;
  label: string;
  active?: boolean;
}

export const NavigationItem = ({
  iconSrc,
  label,
  active,
}: NavigationItemProps) => {
  return (
    <UnstyledButton className={`${styles.item} ${active ? styles.active : ""}`}>
      <Stack gap={4} align="center">
        <Image src={iconSrc} className={styles.icon} w={24} h={24} />
        <Text fz={12} fw={700}>
          {label}
        </Text>
      </Stack>
    </UnstyledButton>
  );
};
