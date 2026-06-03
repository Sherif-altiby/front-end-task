import Product from "../models/product.model.js";

export const getAllProductsService = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {};

  //  Search by title
  if (query.search) {
    filter.title = {
      $regex: query.search,
      $options: "i",
    };
  }

  // Filter by category
  if (query.category) {
    filter.category = query.category;
  }

  // Sorting
  let sortOption = {};

  if (query.sort === "low") {
    sortOption.price = 1; // lowest first
  } else if (query.sort === "high") {
    sortOption.price = -1; // highest first
  } else {
    sortOption.createdAt = -1; // default newest first
  }

  const [products, total] = await Promise.all([
    Product.find(filter).sort(sortOption).skip(skip).limit(limit),

    Product.countDocuments(filter),
  ]);

  return {
    data: products,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getProductByIdService = async (id) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};
