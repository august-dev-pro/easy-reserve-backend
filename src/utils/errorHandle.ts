class ErrorHandler extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string, stack?: any) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.stack = stack;
  }
}

const handleError = (err: ErrorHandler, res: any) => {
  const { statusCode, message, stack } = err;
  res.status(statusCode).json({
    status: "error",
    statusCode: statusCode,
    message: message,
    stack: stack,
  });
};

export { ErrorHandler, handleError };
