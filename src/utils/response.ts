export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
  statusCode?: number;
}

/**
 * Success Response
 * @param data - The data to be sent in response
 * @param message - A success message
 * @param statusCode - HTTP status code (default: 200)
 * @returns Standardized success response
 */
export const successResponse = (
  data: any,
  message = "Request successful",
  statusCode = 200
): ApiResponse => {
  return {
    success: true,
    message,
    data,
    statusCode,
  };
};

/**
 * Failure Response
 * @param message - The error message
 * @param error - Additional error details (optional)
 * @param statusCode - HTTP status code (default: 400)
 * @returns Standardized error response
 */
export const failureResponse = (
  message: string,
  error: any = null,
  statusCode = 400
): ApiResponse => {
  return {
    success: false,
    message,
    error,
    statusCode,
  };
};

/**
 * Unauthorized Response
 * @param message - Custom unauthorized message (default: "Unauthorized")
 * @returns Standardized 401 response
 */
export const unauthorizedResponse = (message = "Unauthorized"): ApiResponse => {
  return {
    success: false,
    message,
    statusCode: 401,
  };
};

/**
 * Forbidden Response
 * @param message - Custom forbidden message (default: "Forbidden")
 * @returns Standardized 403 response
 */
export const forbiddenResponse = (message = "Forbidden"): ApiResponse => {
  return {
    success: false,
    message,
    statusCode: 403,
  };
};

/**
 * Not Found Response
 * @param message - Custom not found message (default: "Resource not found")
 * @returns Standardized 404 response
 */
export const notFoundResponse = (
  message = "Resource not found"
): ApiResponse => {
  return {
    success: false,
    message,
    statusCode: 404,
  };
};

/**
 * Conflict Response
 * @param message - Custom conflict message (default: "Conflict detected")
 * @returns Standardized 409 response
 */
export const conflictResponse = (
  message = "Conflict detected"
): ApiResponse => {
  return {
    success: false,
    message,
    statusCode: 409,
  };
};

/**
 * Server Error Response
 * @param error - The actual error (optional)
 * @param message - Custom message (default: "Internal Server Error")
 * @returns Standardized 500 response
 */
export const serverErrorResponse = (
  error: any = null,
  message = "Internal Server Error"
): ApiResponse => {
  return {
    success: false,
    message,
    error,
    statusCode: 500,
  };
};
