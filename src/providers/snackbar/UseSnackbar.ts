import { useContext } from "react";
import type SnackbarConfig from "./SnackbarConfig";
import SnackbarContext from "./SnackbarContext";

export interface UseSnackbar {
  show: (config: SnackbarConfig) => void;
}

export default function useSnackbar(): UseSnackbar {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error(
      "The 'useSnackbar' hook should be used inside the 'SnackbarProvider' tag.",
    );
  }

  const { setOpen, setConfig } = context;

  const show = (_config: SnackbarConfig) => {
    setOpen(true);
    const config = { ..._config };
    if (config.actionButton) {
      const onClick = config.actionButton.onClick;
      const selfClosingOnClick = () => {
        onClick();
        setOpen(false);
      };
      config.actionButton = {
        ...config.actionButton,
        onClick: selfClosingOnClick,
      };
    }
    setConfig(config);
  };

  return { show };
}
