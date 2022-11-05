import BaseHttpError from "./BaseHttpError";

class UnathorizedAccessError extends BaseHttpError {
  constructor() {
    super("Unathorized access", 401);
  }
}

export default UnathorizedAccessError;