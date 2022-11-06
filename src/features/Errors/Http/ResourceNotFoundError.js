import BaseHttpError from "./BaseHttpError";

class ResourceNotFoundError extends BaseHttpError {
  constructor() {
    super("Resourse not found", 404);
  }
}

export default ResourceNotFoundError;
