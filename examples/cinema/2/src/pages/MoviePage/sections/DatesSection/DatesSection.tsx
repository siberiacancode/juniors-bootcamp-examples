import { Box, Group, Stack, Title } from "@mantine/core";
import { TabsDates } from "@/pages/MoviePage/components/TabsDates/TabsDates";
import { useState } from "react";
import { TimeTag } from "@/pages/MoviePage/components/TimeTag/TimeTag";
import { MainButton } from "@/shared/ui/MainButton/MainButton";

import styles from "./DatesSection.module.css";

export const DatesSection = () => {
  const [value, setValue] = useState("9");

  return (
    <Box className={styles.section}>
      <Stack gap={24} className={styles.stack}>
        <TabsDates
          value={value}
          onChange={setValue}
          items={[
            { id: "9", label: "Пн, 9 янв" },
            { id: "10", label: "Вт, 10 янв" },
            { id: "11", label: "Ср, 11 янв" },
            { id: "12", label: "Чт, 12 янв" },
          ]}
        />
        <Stack gap={8}>
          {/* Отрисуем через map */}
          <Title fz={14} fw={500}>
            Красный зал
          </Title>
          <Group gap={8} wrap="wrap">
            {/* Отрисуем через map */}
            <TimeTag time="11:40" isActive={false} />
            <TimeTag time="12:40" isActive={false} />
            <TimeTag time="13:40" isActive={false} />
            <TimeTag time="14:40" isActive={false} />
            <TimeTag time="16:40" isActive={false} />
          </Group>
        </Stack>
        <Stack gap={8}>
          {/* Отрисуем через map */}
          <Title fz={14} fw={500}>
            Синий зал
          </Title>
          <Group gap={8} wrap="wrap">
            {/* Отрисуем через map */}
            <TimeTag time="11:15" isActive={false} />
            <TimeTag time="12:15" isActive={true} />
            <TimeTag time="13:15" isActive={false} />
          </Group>
        </Stack>
        <Stack gap={8}>
          {/* Отрисуем через map */}
          <Title fz={14} fw={500}>
            Фиолетовый зал
          </Title>
          <Group gap={8} wrap="wrap">
            {/* Отрисуем через map */}
            <TimeTag time="11:15" isActive={false} />
            <TimeTag time="12:15" isActive={false} />
            <TimeTag time="13:15" isActive={false} />
          </Group>
        </Stack>
        <MainButton className={styles.button}>Продолжить</MainButton>
      </Stack>
    </Box>
  );
};
