import { createTheme, ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router";
import Layout from "./components/Layout";
import CounterAndSnackbar from "./features/CounterAndSnackbar";
import DebounceTime from "./features/DebounceTime";
import Home from "./features/Home";
import IdsList from "./features/IdsList";
import IntervalCounter from "./features/IntervalCounter";
import ShoppingList from "./features/ShoppingList";

const theme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: "class",
  },
});

const Redirect = ({ to }: { to: string }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to);
  }, [navigate, to]);

  return <></>;
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/counter-and-snackbar"
            element={<CounterAndSnackbar />}
          />
          <Route path="/interval-counter" element={<IntervalCounter />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
          <Route path="/debounce-time" element={<DebounceTime />} />
          <Route path="/ids-list" element={<IdsList />} />
          <Route path="*" element={<Redirect to="/" />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}
