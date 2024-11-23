/* eslint-disable @typescript-eslint/no-explicit-any */
import MyForm from "@/components/from/MyForm";
import MyInput from "@/components/from/MyInput";
import { Button } from "@/components/ui/button";
import { useChangePasswordMutation } from "@/redux/api/auth.api";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/slice/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { z } from "zod";

const changePasswordSchema = z
  .object({
    oldPassword: z
      .string({ required_error: "Old password is required." })
      .min(6, "New password must be at least 6 characters long."),
    newPassword: z
      .string({ required_error: "New password is required." })
      .min(6, "New password must be at least 6 characters long."),
    confirmPassword: z.string({
      required_error: "Please confirm your new password.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

const defaultValue = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePasswordForm = () => {
  const dispatch = useAppDispatch();

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const onSubmit = async (value: FieldValues) => {
    const toastId = toast.loading("Processing your request...");
    try {
      const res = await changePassword(value).unwrap();
      toast.success(res.message || "Request successful!", {
        id: toastId,
      });
      dispatch(logout());
    } catch (error: any) {
      console.log(error?.data?.message);
      toast.error(error?.data?.message || "Request failed. Please try again", {
        id: toastId,
      });
    }
  };
  return (
    <MyForm
      onSubmit={onSubmit}
      defaultValues={defaultValue}
      resolver={zodResolver(changePasswordSchema)}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MyInput name="oldPassword" label="Old Password" type="password" />
        <MyInput name="newPassword" label="New Password" type="password" />
        <MyInput
          name="confirmPassword"
          label="Again New Password"
          type="password"
        />
      </div>
      <div className="flex justify-end mt-4">
        <Button disabled={isLoading}>Change Password</Button>
      </div>
    </MyForm>
  );
};

export default ChangePasswordForm;
