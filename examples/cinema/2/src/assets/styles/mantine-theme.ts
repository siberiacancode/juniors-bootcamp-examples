import { createTheme } from "@mantine/core";

export const theme = createTheme({
  fontFamily: "Nunito",

  colors: {
    darkest: [
      "#161616", // Очень светлый (тени)
      "#1B1B1B",
      "#202020",
      "#262626",
      "#2E2E2E",
      "#0B0B0B", // Основной цвет (цвет фона)
      "#171717",
      "#1D1D1D",
      "#242424",
      "#2B2B2B", // Темный (границы)
    ],
  },
  // Назначаем нашу группу главной
  primaryColor: "darkest",
  primaryShade: { light: 5, dark: 5 },
});
