import ApiError from "../utils/ApiError.js";

export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  const isDev = process.env.NODE_ENV === "development";

  if (isDev) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err
    });
  }

  // production
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }

  // unknown errors (VERY IMPORTANT)
  console.error("ERROR 💥", err);

  return res.status(500).json({
    status: "error",
    message: "Something went wrong"
  });
};