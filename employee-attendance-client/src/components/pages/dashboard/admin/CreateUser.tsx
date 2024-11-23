/* eslint-disable @typescript-eslint/no-explicit-any */
import MyForm from "@/components/from/MyForm";
import MyInput from "@/components/from/MyInput";
import MySelect from "@/components/from/MySelect";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { useCreateUserMutation } from "@/redux/api/user.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { z } from "zod";

// Zod schema for form validation
const formSchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .max(100, "Name must be less than 100 characters"),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email address"),
    designation: z.string({
      required_error: "Designation is required",
    }),
    role: z.string({
      required_error: "Role is required",
    }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must be less than 50 characters"),
    confirmPassword: z
      .string({
        required_error: "Confirm password is required",
      })
      .min(6, "Confirm password must be at least 6 characters")
      .max(50, "Confirm password must be less than 50 characters"),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const defaultValues = {
  name: "",
  email: "",
  designation: "",
  role: "",
  password: "",
  confirmPassword: "",
};
const CreateUser = () => {
  const navigate = useNavigate();

  const [createUser] = useCreateUserMutation();

  const onSubmit = async (value: FieldValues) => {
    const res = (await createUser(value)) as any;
    console.log(res, "res");
    if (res.data) {
      toast.success(res.data?.message);
      navigate("/dashboard/admin/user-management/all-employees");
    } else if (res?.error) {
      toast.error(res.error?.message || "Something went wrong");
    }
  };
  return (
    <div className="space-y-6">
      <PageHeader />
      <div className="bg-white rounded-[16px] p-6 shadow border border-[#f2f4f7]">
        <MyForm
          onSubmit={onSubmit}
          resolver={zodResolver(formSchema)}
          defaultValues={defaultValues}
        >
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <MyInput
              name="name"
              label="Enter Name"
              type="text"
              placeholder="Name"
            />
            <MyInput
              name="email"
              label="Enter Email"
              type="email"
              placeholder="Email"
            />
            <MyInput
              name="designation"
              label="Enter Designation"
              type="text"
              placeholder="Designation"
            />

            <MySelect
              name="role"
              label="Select Role"
              placeholder="Role"
              options={[
                {
                  label: "Admin",
                  value: "Admin",
                },
                {
                  label: "Employee",
                  value: "Employee",
                },
              ]}
              isSuggestion={false}
            />

            <MyInput
              name="password"
              label="Enter Password"
              type="password"
              placeholder="Password"
            />

            <MyInput
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="mt-6 flex justify-end">
            <Button>Submit</Button>
          </div>
        </MyForm>
      </div>
    </div>
  );
};

export default CreateUser;
