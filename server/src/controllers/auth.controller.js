import { registerService, loginService } from "../services/auth.service.js";
import { registerSchema, loginSchema } from "../validations/auth.validation.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

// REGISTER
export const register = asyncHandler(async (req, res) => {



  const parsed = registerSchema.safeParse(req.body);


  if (!parsed.success) {
    throw new ApiError(400, parsed.error);
  }

  const result = await registerService(parsed.data);

  res.status(201).json({
    status: "success",
    data: result
  });
});

// LOGIN
export const login = asyncHandler(async (req, res) => {
 

  const parsed = loginSchema.safeParse(req.body);


  if (!parsed.success) {
    throw new ApiError(400, parsed.error);
  }

  const result = await loginService(parsed.data);

  res.status(200).json({
    status: "success",
    data: result
  });
});