import Constant from "../../constant";
import BaseError from "./BaserError";
class BadRequestError extends BaseError {
    name: string;
    statusCode: number;
    message: string;
    constructor(message: string, statusCode: number) {
        super(message);
        Object.setPrototypeOf(this, BadRequestError.prototype);
        this.name = Constant.errorName.badRequest;
        this.statusCode = statusCode;
        this.message = message;
    }
}

export default BadRequestError;
