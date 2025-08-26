import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    media: [String],
    category: String,
    // mqh với collection khác trong mongoDB ,ObjectId tham chiếu đến model 'Collection'
    // populate dữ liệu collection khi query
    collections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Collection" }],
    tags: [String],
    sizes: [String],
    colors: [String],
    price: {
      // Dùng kiểu Decimal128 (MongoDB hỗ trợ số thập phân chính xác cao).
      type: mongoose.Schema.Types.Decimal128,
      // Có getter để convert từ Decimal128 sang float khi trả về JSON.
      // Ví dụ: trong DB lưu Decimal128("199.99") → khi query sẽ trả về 199.99 (số thường).
      get: (v: mongoose.Schema.Types.Decimal128) => {
        return parseFloat(v.toString());
      },
    },
    expense: {
      type: mongoose.Schema.Types.Decimal128,
      get: (v: mongoose.Schema.Types.Decimal128) => {
        return parseFloat(v.toString());
      },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { toJSON: { getters: true } }
  // Khi bạn gọi res.json(product) hoặc product.toJSON(), 
  // Mongoose sẽ chạy getter bạn đã định nghĩa (ở price & expense) 
  // -> trả về dạng number thay vì Decimal128.
);

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
