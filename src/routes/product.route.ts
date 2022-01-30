import { Router } from "express";
import { body } from "express-validator";
import * as productController from "../controllers/product";
import { logger, validator, isSeller, auth, isBuyer } from "../middlewares";

const router = Router();

router.get("/", logger, productController.getAll);

router.delete(
  "/remove",
  logger,
  auth,
  isSeller,
  [
    body("productId")
      .notEmpty()
      .withMessage("productId is required")
      .isString()
      .withMessage("productId must be a string")
      .not()
      .contains("null", { ignoreCase: true })
      .withMessage("productId can not be null or undefined")
      .not()
      .contains("undefined", { ignoreCase: true })
      .withMessage("productId can not be null or undefined")
      .trim(),
  ],
  validator,
  productController.remove,
);

router.post(
  "/create",
  logger,
  auth,
  isSeller,
  [
    body("productName")
      .notEmpty()
      .withMessage("productName is required")
      .isString()
      .withMessage("productName must be a string")
      .not()
      .contains("null", { ignoreCase: true })
      .withMessage("productName can not be null or undefined")
      .not()
      .contains("undefined", { ignoreCase: true })
      .withMessage("productName can not be null or undefined")
      .trim(),
    body("amountAvailable")
      .notEmpty()
      .withMessage("amountAvailable is required")
      .isInt({ gt: 0 })
      .withMessage("amountAvailable must be a number greater than 0")
      .trim(),
    body("cost")
      .notEmpty()
      .withMessage("cost is required")
      .isIn([5, 10, 20, 50, 100])
      .withMessage("cost must be coins of 5, 10, 20, 50 or 100 only")
      .trim(),
  ],
  validator,
  productController.create,
);

router.post(
  "/buy",
  logger,
  auth,
  isBuyer,
  [
    body("productId")
      .notEmpty()
      .withMessage("productId is required")
      .isString()
      .withMessage("productId must be a string")
      .not()
      .contains("null", { ignoreCase: true })
      .withMessage("productId can not be null or undefined")
      .not()
      .contains("undefined", { ignoreCase: true })
      .withMessage("productId can not be null or undefined")
      .trim(),
    body("amount")
      .notEmpty()
      .withMessage("amount is required")
      .isInt({ gt: 0 })
      .withMessage("amount must be a number greater than 0")
      .trim(),
  ],
  validator,
  productController.buy,
);

router.put(
  "/amount",
  logger,
  auth,
  isSeller,
  [
    body("productId")
      .notEmpty()
      .withMessage("productId is required")
      .isString()
      .withMessage("productId must be a string")
      .not()
      .contains("null", { ignoreCase: true })
      .withMessage("productId can not be null or undefined")
      .not()
      .contains("undefined", { ignoreCase: true })
      .withMessage("productId can not be null or undefined")
      .trim(),
    body("amount")
      .notEmpty()
      .withMessage("amount is required")
      .isInt({ gt: 0 })
      .withMessage("amount must be a number greater than 0")
      .trim(),
  ],
  validator,
  productController.updateAmount,
);

router.put(
  "/cost",
  logger,
  auth,
  isSeller,
  [
    body("productId")
      .notEmpty()
      .withMessage("productId is required")
      .isString()
      .withMessage("productId must be a string")
      .not()
      .contains("null", { ignoreCase: true })
      .withMessage("productId can not be null or undefined")
      .not()
      .contains("undefined", { ignoreCase: true })
      .withMessage("productId can not be null or undefined")
      .trim(),
    body("cost")
      .notEmpty()
      .withMessage("cost is required")
      .isIn([5, 10, 20, 50, 100])
      .withMessage("cost must be coins of 5, 10, 20, 50 or 100 only")
      .trim(),
  ],
  validator,
  productController.updateCost,
);

export default router;
