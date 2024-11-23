/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/shared/Loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  useGetSingleUsersQuery,
  useUploadProfilePhotoMutation,
} from "@/redux/api/user.api";
import { useAppSelector } from "@/redux/hooks";
import { TEmployee } from "@/type/user.tpe";
import { Pen, Trash } from "lucide-react";
import ChangePasswordForm from "./ChangePasswordForm";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const Profile = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { data, isLoading } = useGetSingleUsersQuery(user?.employee_id);

  const [uploadProfilePhoto, { isLoading: uploadProfileLoading }] =
    useUploadProfilePhotoMutation();

  if (isLoading) {
    return <Loading />;
  }

  console.log(data.data);

  const handleUploadProfilePhoto = async (value: any) => {
    const formData = new FormData();
    formData.append("file", value);
    const toastId = toast.loading("Processing your request...");
    try {
      const res = await uploadProfilePhoto({
        data: formData,
        id: data?.data?._id,
      }).unwrap();
      toast.success(res.message || "Request successful!", {
        id: toastId,
      });
    } catch (error: any) {
      console.log(error?.data?.message);
      toast.error(error?.data?.message || "Request failed. Please try again", {
        id: toastId,
      });
    }
  };

  const userInfo = data?.data as TEmployee;

  return (
    <div className="space-y-6">
      <h3 className="text-[#343a40] text-2xl font-semibold font-['Roboto'] leading-9">
        Profile
      </h3>
      <div className=" h-[188px] rounded-[10px] p-6 flex justify-between items-center">
        <Avatar className="size-[140px] rounded-full">
          <AvatarImage src={userInfo.profileImage} />
          <AvatarFallback>{userInfo.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-red-500 hover:text-red-600">
            <Trash />
          </Button>
          <Input
            disabled={uploadProfileLoading}
            className={cn("max-w-[250px]")}
            placeholder="Upload photo"
            onChange={(e) =>
              handleUploadProfilePhoto(e.target.files && e.target.files[0])
            }
            type="file"
          />
          {/* <Button variant="ghost">
            <Upload className="size-4 mr-2" /> Upload
          </Button> */}
        </div>
      </div>

      {/* personal information */}
      <div className=" p-6 space-y-5">
        <div className="flex justify-between items-center">
          <h3 className="text-primary text-[32px] font-bold font-['Nunito'] leading-[38.40px] tracking-tight">
            Personal Information
          </h3>
          <Link to={userInfo._id}>
            <Button variant="ghost">
              <Pen className="size-4 mr-2" /> Edit
            </Button>
          </Link>
        </div>
        <hr />
        <div className="max-w-[610px]  grid grid-cols-1 lg:grid-cols-2 gap-y-8 ">
          <div className="space-y-2">
            <h4 className=" text-gray-600 text-lg font-medium font-['Nunito'] leading-normal tracking-tight">
              Name
            </h4>
            <p className=" text-gray-700 text-2xl font-semibold font-['Nunito'] leading-[31.20px] ">
              {userInfo?.name}
            </p>
          </div>
          <div className=" space-y-2">
            <h4 className="text-gray-600 text-lg font-medium font-['Nunito'] leading-normal tracking-tight">
              Email
            </h4>
            <p className="text-gray-700 text-2xl font-semibold font-['Nunito'] leading-[31.20px] ">
              {userInfo?.email}
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-gray-600 text-lg font-medium font-['Nunito'] leading-normal tracking-tight">
              User Role
            </h4>
            <p className="text-gray-700 text-2xl font-semibold font-['Nunito'] leading-[31.20px] ">
              {userInfo.role}
            </p>
          </div>
          <div className=" space-y-2">
            <h4 className="text-gray-600 text-lg font-medium font-['Nunito'] leading-normal tracking-tight">
              Designation
            </h4>
            <p className="text-gray-700 text-2xl font-semibold font-['Nunito'] leading-[31.20px] ">
              {userInfo?.designation}
            </p>
          </div>
        </div>
      </div>
      <div className=" p-6 space-y-5">
        <h3 className="text-primary text-[32px] font-bold font-['Nunito'] leading-[38.40px] tracking-tight">
          Change Password
        </h3>
        <hr />
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default Profile;
