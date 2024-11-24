import MyDatePicker from "@/components/from/MyDatePicker";
import MyForm from "@/components/from/MyForm";
import MySelect from "@/components/from/MySelect";
import MyTextarea from "@/components/from/MyTextarea";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues } from "react-hook-form";
import {
  leaveFormDefaultValue,
  leaveFormSchema,
} from "./leaveRequest.validation";
import { toast } from "sonner";
import { useRequestForLeaveMutation } from "@/redux/api/leave.api";
import { useAppSelector } from "@/redux/hooks";
import { useNavigate } from "react-router-dom";

const LeaveRequestForm = () => {
  const navigate = useNavigate();

  const employeeId = useAppSelector((state) => state.auth.user?.employee_id);

  const [requestForLeave] = useRequestForLeaveMutation();

  const onSubmit = async (value: FieldValues) => {
    value.employeeId = employeeId;
    const toastId = toast.loading("Processing your leave request...");
    try {
      const res = await requestForLeave(value).unwrap();
      toast.success(res.message || "Leave request successful!", {
        id: toastId,
      });
      navigate("/dashboard/employee/all-leave-request");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error?.data?.message);
      toast.error(
        error?.data?.message || "Leave request failed. Please try again",
        {
          id: toastId,
        }
      );
    }
  };
  return (
    <div className="space-y-6">
      <PageHeader />

      <div className="max-w-2xl mx-auto border rounded-md p-4">
        <MyForm
          onSubmit={onSubmit}
          resolver={zodResolver(leaveFormSchema)}
          defaultValues={leaveFormDefaultValue}
        >
          <div className="grid grid-cols-1 gap-4">
            <MySelect
              label="Leave Type"
              name="leaveType"
              placeholder="Slect One"
              isSuggestion={false}
              options={[
                {
                  label: "Sick",
                  value: "Sick",
                },
                {
                  label: "Other",
                  value: "Other",
                },
              ]}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <MyDatePicker name="startDate" label="Start Date" />
              <MyDatePicker name="endDate" label="End Date" />
            </div>
            <MyTextarea label="Description" name="description" rows={4} />
            <div className="flex justify-end">
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </MyForm>
      </div>
    </div>
  );
};

export default LeaveRequestForm;
