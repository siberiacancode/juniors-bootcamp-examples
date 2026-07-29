import { Button } from "@mantine/core";

import type { ButtonProps } from "@mantine/core";

export const MainButton = ({ children, ...rest }: ButtonProps) => {
  return (
    <Button
      fullWidth
      h={52}
      styles={{
        label: {
          fontSize: "14px",
          letterSpacing: "0.5%",
          lineHeight: "21px",
          fontWeight: 500,
        },
      }}
      radius={26}
      {...rest}
    >
      {children}
    </Button>
  );
};
