export default interface SnackbarConfig {
  message: string;
  actionButton?: { label: string; onClick: () => void };
}
