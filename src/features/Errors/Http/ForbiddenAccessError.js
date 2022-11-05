import BaseHttpError from "./BaseHttpError";

class ForbiddenAccessError extends BaseHttpError {
  constructor() {
    super("Forbidden access", 403);
  }
}

export default ForbiddenAccessError;