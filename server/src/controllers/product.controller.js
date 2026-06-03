import { asyncHandler } from "../utils/asyncHandler.js";
import { getAllProductsService } from "../services/product.service.js";

export const getAllProducts = asyncHandler(async (req, res) => {
  const result = await getAllProductsService(req.query);

  res.status(200).json({
    status: "success",
    results: result.data.length,
    pagination: result.pagination,
    data: result.data
  });
});