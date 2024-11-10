import { z } from "zod";

export const leaveFormSchema = z
  .object({
    description: z
      .string({ required_error: "Description is required" })
      .max(500, "Description should not exceed 500 characters"),
    leaveType: z.string({ required_error: "Leave type is requird" }),
    startDate: z.date({ required_error: "Start Date is required" }),
    endDate: z.date({ required_error: "End Date is required" }),
  })
  .refine(
    ({ endDate, startDate }) => {
      return new Date(endDate) >= new Date(startDate);
    },
    {
      message: "End Date cannot be earlier than Start Date",
      path: ["endDate"],
    }
  );

export const leaveFormDefaultValue = {
  description: "",
  endDate: "",
  startDate: "",
  leaveType: "",
};
