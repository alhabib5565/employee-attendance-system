import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

export const createProductValidation = z.object({
  productName: z
    .string()
    .min(1, "Product Name is required")
    .max(100, "Product Name must be 100 characters or less"),
  productType: z
    .string({
      required_error: "Please select a valid product type",
    })
    .min(1, "Please select a valid product type"),
  productPrice: z
    .string({
      invalid_type_error: "Price must be a number",
    })
    .min(0.01, "Price must be greater than zero"),
  //   Product logo validation
  productLogo: z
    .instanceof(File, { message: "Product logo is required" })
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      "File size must be less than 5MB"
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg and .png formats are allowed"
    ),
  productCoverImage: z
    .instanceof(File, { message: "Product Cover image is required" })
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      "File size must be less than 5MB"
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg and .png formats are allowed"
    ),
});

export const createProductDefaultValues = {
  productName: "habib",
  productType: "Book",
  productPrice: 5,
};
