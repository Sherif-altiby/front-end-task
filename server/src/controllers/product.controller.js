import { asyncHandler } from "../utils/asyncHandler.js";
import { getAllProductsService, getProductByIdService } from "../services/product.service.js";

export const getAllProducts = asyncHandler(async (req, res) => {
  const result = await getAllProductsService(req.query);

  res.status(200).json({
    status: "success",
    results: result.data.length,
    pagination: result.pagination,
    data: result.data
  });
});



export const getProductByIdController = async (req, res) => {
  try {
    const product = await getProductByIdService(req.params.id);

    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};