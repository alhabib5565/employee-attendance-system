import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

type TMyFileInput = {
  name: string;
  label: string;
  placeholder?: string;
  isGrid?: boolean;
};

const MyFileInput = ({ name, label, placeholder, isGrid }: TMyFileInput) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <FormItem
            className={cn({
              "grid grid-cols-1 md:grid-cols-7 md:gap-4 items-center": isGrid,
            })}
          >
            <FormLabel
              className={cn({
                " md:col-span-2": isGrid,
              })}
            >
              {label}
            </FormLabel>
            <FormControl
              className={cn({
                "col-span-5": isGrid,
              })}
            >
              <div className="flex flex-col gap-2">
                <Input
                  type="file"
                  className="bg-transparent"
                  placeholder={placeholder || label}
                  onChange={(e) =>
                    field.onChange(e.target.files && e.target.files[0])
                  }
                />
                <FormMessage>{error?.message}</FormMessage>
              </div>
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
};

export default MyFileInput;
