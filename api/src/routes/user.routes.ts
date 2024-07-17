import { Router } from "express";

import * as userService from "../services/user.service";
import * as userConverter from "../converters/user.converter";
import * as userValidators from "../middleware/validators/user.validator";

const userRouter = Router();

userRouter.get("/:id", userValidators.isUserOwner, async (req, res) => {
  try {
    const user = await userService.getById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(userConverter.entityToDTO(user));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query error" });
  }
});

export { userRouter };
