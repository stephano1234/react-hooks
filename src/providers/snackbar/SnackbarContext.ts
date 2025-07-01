import { createContext } from "react";
import type SnackbarConfig from "./SnackbarConfig";

const SnackbarContext = createContext<{
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setConfig: React.Dispatch<React.SetStateAction<SnackbarConfig | null>>;
} | null>(null);

export default SnackbarContext;
