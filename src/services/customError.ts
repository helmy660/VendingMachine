interface ICustomError {
  code: number;
  message: string;
}

export class CustomError extends Error {
  constructor(error: ICustomError) {
    super(error.message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.message = error.message;
    this.code = error.code;
    this.name = "CustomError";
  }
  public code: number;
}

export const ErrorTypes = {
  INVALID_REQUEST_BODY: {
    code: 4001,
    message: "Error: Invalid data in request body",
  },
  INVALID_CREDENTIALS: {
    code: 4002,
    message: "Error: Invalid username or password",
  },
  INVALID_USERNAME: {
    code: 4003,
    message: "Error: Invalid username",
  },
  INVALID_USER_ID: {
    code: 4004,
    message: "Error: Invalid user id",
  },
  USER_NOT_AUTHORIZED: {
    code: 4005,
    message: "Error: This User is not authorized to perform this action",
  },
  INVALID_ACTION: {
    code: 4006,
    message: "Error: Failed to perform this action",
  },
  INVALID_QUANTITY: {
    code: 4007,
    message: "Error: Invalid quantity. Only accepts 5,10,20,50,100 cent coins",
  },
  INVALID_PRODUCT: {
    code: 4008,
    message: "Error: Invalid product",
  },
  Empty_DEPOSIT: {
    code: 4009,
    message: "Error: You don not have enough deposit. Please recharge",
  },
  INVALID_SELLER: {
    code: 4010,
    message: "Error: Invalid seller",
  },
  OUT_OF_STOCK: {
    code: 4011,
    message: "Error: Those items are out of stock.",
  },
};
