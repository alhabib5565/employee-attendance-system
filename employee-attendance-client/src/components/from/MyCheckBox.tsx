import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";

type TMyCheckbox = {
  name: string;
  label: string;
};

const MyCheckBox = ({ name, label }: TMyCheckbox) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem
            className={cn(
              "flex flex-row items-start space-x-3 space-y-0 rounded-md px-4 py-3",
              {
                "bg-secondary text-primary": field.value,
              }
            )}
          >
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel>{label}</FormLabel>
          </FormItem>
        );
      }}
    />
  );
};

export default MyCheckBox;
