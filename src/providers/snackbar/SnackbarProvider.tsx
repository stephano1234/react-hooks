import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  IconButton,
  Slide,
  Snackbar,
  type SlideProps,
  type SnackbarCloseReason,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import type SnackbarConfig from "./SnackbarConfig";
import SnackbarContext from "./SnackbarContext";

const DURATION = 5000;

const SlideTransition = (props: SlideProps) => (
  <Slide {...props} direction="up" />
);

export default function SnackbarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState(0);
  const [activeConfig, setActiveConfig] = useState<SnackbarConfig | null>(null);
  const [config, setConfig] = useState<SnackbarConfig | null>(null);

  const handleCloseButton = (): void => setOpen(false);

  const handleAutoClose = (_: unknown, reason: SnackbarCloseReason): void => {
    if (reason !== "timeout") {
      return;
    }

    setOpen(false);
  };

  const handleConsecutiveOpenings = useCallback((): void => {
    const setNewKey = () => setKey(new Date().getTime());

    if (open && !activeConfig && config) {
      setNewKey();
      setActiveConfig(config);
      setConfig(null);
      return;
    }

    if (!open && activeConfig && !config) {
      setActiveConfig(null);
      return;
    }

    if (open && activeConfig && config) {
      setOpen(false);
      return;
    }

    if (!open && activeConfig && config) {
      setNewKey();
      setActiveConfig(config);
      setConfig(null);
      setOpen(true);
    }
  }, [open, activeConfig, config]);

  useEffect(() => {
    handleConsecutiveOpenings();
  }, [handleConsecutiveOpenings]);

  const action = (
    <>
      {activeConfig?.actionButton && (
        <Button
          color="primary"
          size="small"
          onClick={activeConfig.actionButton.onClick}
        >
          {activeConfig.actionButton.label}
        </Button>
      )}

      <IconButton color="inherit" size="small" onClick={handleCloseButton}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <>
      <Snackbar
        key={key}
        open={open}
        autoHideDuration={DURATION}
        slots={{ transition: SlideTransition }}
        message={activeConfig?.message ?? ""}
        action={action}
        onClose={handleAutoClose}
      ></Snackbar>

      <SnackbarContext.Provider value={{ setOpen, setConfig }}>
        {children}
      </SnackbarContext.Provider>
    </>
  );
}
