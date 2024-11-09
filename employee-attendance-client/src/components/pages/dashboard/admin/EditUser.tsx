/* eslint-disable @typescript-eslint/no-explicit-any */
import MyForm from "@/components/from/MyForm";
import MyInput from "@/components/from/MyInput";
import MySelect from "@/components/from/MySelect";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import {
  useEditUsersMutation,
  useGetSingleUsersQuery,
} from "@/redux/api/user.api";
import { FieldValues } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading } = useGetSingleUsersQuery(id);

  const [editUser] = useEditUsersMutation();
  if (isLoading) {
    return <p>Loading...</p>;
  }

  const defaultValues = {
    name: data?.data?.name,
    email: data?.data?.email,
    role: data?.data?.role,
  };
  const onSubmit = async (data: FieldValues) => {
    const res = (await editUser({ data, id })) as any;
    console.log(res, "res");
    if (res.data) {
      toast.success(res.data?.message || "User edit successfull");
      navigate("/user-management/all-users");
    } else if (res?.error) {
      toast.error(res.error?.message || "Something went wrong");
    }
  };
  return (
    <div className="space-y-6">
      <PageHeader pageTitle="Edit User" />
      <div className="bg-white rounded-[16px] p-6 shadow border border-[#f2f4f7]">
        <MyForm onSubmit={onSubmit} defaultValues={defaultValues}>
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
            {/* <MySelect
              name="designation"
              label="Assigned Role"
              placeholder="Designation"
              options={[
                {
                  label: "Admin",
                  value: "Admin",
                },
              ]}
              isSuggestion={false}
            /> */}
            <MySelect
              name="role"
              label="Select Role"
              placeholder="Role"
              options={[
                {
                  label: "Admin",
                  value: "Admin",
                },
              ]}
              isSuggestion={false}
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
export default EditUser;
