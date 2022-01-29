import { Router } from "express";
import { body } from "express-validator";
import * as userController from "../controllers/user";
import { logger, validator, isBuyer, auth } from "../middlewares";

const router = Router();

router.post(
  "/login",
  logger,
  [
    body("username")
      .notEmpty()
      .withMessage("username is required")
      .isString()
      .withMessage("username must be a string")
      .not()
      .contains("null", { ignoreCase: true })
      .withMessage("username can not be null or undefined")
      .not()
      .contains("undefined", { ignoreCase: true })
      .withMessage("username can not be null or undefined")
      .trim(),
    body("password")
      .notEmpty()
      .withMessage("password is required")
      .isString()
      .withMessage("password must be a string")
      .not()
      .contains("null", { ignoreCase: true })
      .withMessage("password can not be null or undefined")
      .not()
      .contains("undefined", { ignoreCase: true })
      .withMessage("password can not be null or undefined")
      .trim(),
  ],
  validator,
  userController.login,
);

router.post(
  "/create",
  logger,
  [
    body("username")
      .notEmpty()
      .withMessage("username is required")
      .isString()
      .withMessage("username must be a string")
      .not()
      .contains("null", { ignoreCase: true })
      .withMessage("username can not be null or undefined")
      .not()
      .contains("undefined", { ignoreCase: true })
      .withMessage("username can not be null or undefined")
      .trim(),
    body("password")
      .notEmpty()
      .withMessage("password is required")
      .isString()
      .withMessage("password must be a string")
      .not()
      .contains("null", { ignoreCase: true })
      .withMessage("password can not be null or undefined")
      .not()
      .contains("undefined", { ignoreCase: true })
      .withMessage("password can not be null or undefined")
      .trim(),
    body("role")
      .trim()
      .notEmpty()
      .withMessage("role is required")
      .isIn(["seller", "buyer"])
      .withMessage("role can only has values seller or buyer"),
  ],
  validator,
  userController.signup,
);

router.post(
  "/deposit",
  logger,
  auth,
  isBuyer,
  [
    body("deposit")
      .notEmpty()
      .withMessage("deposit is required")
      .isIn([5, 10, 20, 50, 100])
      .withMessage("deposit must be coins of 5, 10, 20, 50 or 100 only")
      .trim(),
  ],
  validator,
  userController.addDeposit,
);

router.put(
  "/update",
  logger,
  auth,
  [
    body("newPassword")
      .notEmpty()
      .withMessage("newPassword is required")
      .isString()
      .withMessage("newPassword must be a string")
      .not()
      .contains("null", { ignoreCase: true })
      .withMessage("newPassword can not be null or undefined")
      .not()
      .contains("undefined", { ignoreCase: true })
      .withMessage("newPassword can not be null or undefined")
      .trim(),
  ],
  validator,
  userController.update,
);

router.get("/", logger, auth, userController.getById);

router.post("/reset", logger, auth, isBuyer, userController.resetDeposit);

router.delete("/removeAccount", logger, auth, userController.remove);

export default router;
