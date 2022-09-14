type LogCallback = (message: string) => void;

export type Logger = {
  info: LogCallback;
  success: LogCallback;
  warn: LogCallback;
  error: LogCallback;
  log: LogCallback;
};

export type LogContext = {
  log: Logger;
};
