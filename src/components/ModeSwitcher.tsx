import { FormControlLabel, Switch } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";

export default function ModeSwitcher() {
  const { mode, systemMode, setMode } = useColorScheme();

  if (!mode) {
    return null;
  }

  const appliedMode = mode === "system" ? systemMode : mode;

  return (
    <FormControlLabel
      control={
        <Switch
          checked={appliedMode === "dark"}
          onChange={(event) => setMode(event.target.checked ? "dark" : "light")}
        />
      }
      label="Mode"
    />
  );
}
