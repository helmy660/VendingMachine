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
  INVALID_CREDENTIALS: {
    code: 4001,
    message: "Error: Invalid username or password",
  },
  INVALID_USER_ID: {
    code: 4002,
    message: "Error: Invalid user id",
  },
  INVALID_ACTION: {
    code: 4003,
    message: "Error: Failed to perform this action",
  },
  INVALID_PRODUCT: {
    code: 4004,
    message: "Error: Invalid product",
  },
  INVALID_SELLER: {
    code: 4005,
    message: "Error: Invalid seller",
  },
  USER_NOT_AUTHORIZED: {
    code: 4006,
    message: "Error: This User is not authorized to perform this action",
  },
  USER_EMPTY_DEPOSIT: {
    code: 4007,
    message: "Error: You don not have enough deposit. Please recharge",
  },
  PRODUCT_ADDING: {
    code: 4008,
    message: "Error: Failed to add this product",
  },
  PRODUCT_COST_UPDATING: {
    code: 4009,
    message: "Error: Failed to update the cost of this product",
  },
  PRODUCT_AMOUNT_UPDATING: {
    code: 4010,
    message: "Error: Failed to update the amount of this product",
  },
  PRODUCT_EXISTING: {
    code: 4011,
    message: "Error: This product is already existing, please select another name",
  },
  PRODUCT_OUT_OF_STOCK: {
    code: 4012,
    message: "Error: This item is out of stock.",
  },
  PRODUCT_AVAILABLE_AMOUNT: {
    code: 4013,
    message: "Error: No enough amount for this prodcut to perform this action",
  },
  VALIDATION_ERROR: {
    code: 4014,
    message: "Validation Error",
  },
};
