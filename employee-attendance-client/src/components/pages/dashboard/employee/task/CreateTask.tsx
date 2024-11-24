import MyForm from "@/components/from/MyForm";
import MyTextarea from "@/components/from/MyTextarea";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues } from "react-hook-form";

import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";
import { useNavigate } from "react-router-dom";
import { taskFormDefaultValue, taskFormSchema } from "./task.validation";
import MyInput from "@/components/from/MyInput";
import { useCreateTaskMutation } from "@/redux/api/task.api";

const CreateTask = () => {
  const navigate = useNavigate();

  const employeeId = useAppSelector((state) => state.auth.user?.employee_id);

  const [createTask] = useCreateTaskMutation();

  const onSubmit = async (value: FieldValues) => {
    value.createdBy = employeeId;
    const toastId = toast.loading("Processing your request...");
    try {
      const res = await createTask(value).unwrap();
      toast.success(res.message || "Request successful!", {
        id: toastId,
      });
      navigate("/dashboard/employee/all-task");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error?.data?.message);
      toast.error(error?.data?.message || "Request failed. Please try again", {
        id: toastId,
      });
    }
  };
  return (
    <div className="space-y-6">
      <PageHeader />

      <div className="max-w-2xl mx-auto border rounded-md p-4">
        <MyForm
          onSubmit={onSubmit}
          resolver={zodResolver(taskFormSchema)}
          defaultValues={taskFormDefaultValue}
        >
          <div className="grid grid-cols-1 gap-4">
            <MyInput name="title" type="text" label="Task Title" />
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

export default CreateTask;
