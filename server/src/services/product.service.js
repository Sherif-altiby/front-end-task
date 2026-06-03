import Product from "../models/product.model.js";

export const getAllProductsService = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {};

  // 🔍 Search by title
  if (query.search) {
    filter.title = {
      $regex: query.search,
      $options: "i" // case-insensitive
    };
  }

  // Filter by category
  if (query.category) {
    filter.category = query.category;
  }

  const [products, total] = await Promise.all([
    Product.find(filter)
      .skip(skip)
      .limit(limit)
      ,

    Product.countDocuments(filter)
  ]);

  return {
    data: products,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};