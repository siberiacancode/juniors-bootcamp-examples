import { Group, Paper, Button, ActionIcon, Image, Text } from "@mantine/core";
import IconTicket from "@/assets/icons/chest-icon.png";
import IconUser from "@/assets/icons/user-icon.png";
import IconLogout2 from "@/assets/icons/logout-icon.png";

import logo from "@/assets/icons/logo.png";

import styles from "./Header.module.css";

export const Header = () => {
  return (
    <Paper className={styles.header} radius={40} withBorder>
      <Group align="center" gap={4}>
        <Image src={logo} alt="Cinema" w={20} h={20} />
        <Text fw={800} fz={16} mb={"-3px"}>
          CINEMA
        </Text>
      </Group>
      <Group gap={12}>
        <ActionIcon variant="subtle" color="grey" radius="xl" size={32}>
          <Image src={IconTicket} w={20} h={20} />
        </ActionIcon>

        <ActionIcon variant="subtle" color="grey" radius="xl" size={32}>
          <Image src={IconUser} w={20} h={20} />
        </ActionIcon>

        <Button
          radius="xl"
          color="dark"
          rightSection={<Image src={IconLogout2} />}
        >
          Выйти
        </Button>
      </Group>
    </Paper>
  );
};
