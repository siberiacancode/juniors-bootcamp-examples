import "@mantine/core/styles.css";
import { Container, MantineProvider } from "@mantine/core";
import { theme } from "@/assets/styles/mantine-theme";
import { Header } from "@/shared/ui/Header/Header";
import { Outlet } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/api/query-client";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Container size={1240} px={20}>
          <Header />
          <Outlet />
        </Container>
      </MantineProvider>
      <TanStackRouterDevtools />
    </QueryClientProvider>
  );
};
