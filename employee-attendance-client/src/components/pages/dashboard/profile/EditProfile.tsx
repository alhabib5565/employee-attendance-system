/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import MyForm from "@/components/from/MyForm";
import MyInput from "@/components/from/MyInput";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import {
  useEditUsersMutation,
  useGetSingleUsersQuery,
} from "@/redux/api/user.api";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Loading from "@/components/shared/Loading";

const EditProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetSingleUsersQuery(id);
  const [editProfile, { isLoading: isEditLoadin }] = useEditUsersMutation();

  if (isLoading) {
    return <Loading />;
  }

  const onSubmit = async (value: FieldValues) => {
    const toastId = toast.loading("Processing your request...");
    try {
      const res = await editProfile({
        id,
        data: value,
      }).unwrap();
      toast.success(res.message || "Request successful!", {
        id: toastId,
      });
      navigate("/dashboard/admin/profile");
    } catch (error: any) {
      console.log(error?.data?.message);
      toast.error(error?.data?.message || "Request failed. Please try again", {
        id: toastId,
      });
    }
  };
  return (
    <div>
      <div className="space-y-6">
        <PageHeader pageTitle="Edit Profile" />
        <div className="bg-white rounded-[16px] p-6 shadow border border-[#f2f4f7]">
          <MyForm onSubmit={onSubmit} defaultValues={data?.data}>
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
            </div>
            <div className="mt-6 flex justify-end">
              <Button disabled={isEditLoadin}>Submit</Button>
            </div>
          </MyForm>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
