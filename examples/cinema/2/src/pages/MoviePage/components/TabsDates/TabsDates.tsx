import { Paper, UnstyledButton } from "@mantine/core";
import styles from "./TabsDates.module.css";

interface DateTab {
  id: string;
  label: string;
}

interface DateTabsProps {
  value: string;
  onChange: (value: string) => void;
  items: DateTab[];
}

export const TabsDates = ({ value, onChange, items }: DateTabsProps) => {
  return (
    <div className={styles.wrapper}>
      <Paper className={styles.root} radius="xl">
        {items.map((item) => (
          <UnstyledButton
            key={item.id}
            className={`${styles.tab} ${
              value === item.id ? styles.active : ""
            }`}
            onClick={() => onChange(item.id)}
          >
            {item.label}
          </UnstyledButton>
        ))}
      </Paper>
    </div>
  );
};
