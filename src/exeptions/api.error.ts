export default class ApiError extends Error {
  status;
  constructor(status: 400 | 401 | 403 | 404, message: string) {
    super(message);
    this.status = status;
  }

  static BadRequest(message: string) {
    return new ApiError(400, message);
  }
  static Unauthorized(message: string) {
    return new ApiError(401, message);
  }
  static Forbiden(message: string) {
    return new ApiError(403, message);
  }
  static NotFound(message: string) {
    return new ApiError(404, message);
  }
}
