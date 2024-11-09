import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useFormContext } from "react-hook-form";
import { Textarea } from "../ui/textarea";

type TMyTextarea = {
  name: string;
  label: string;
  placeholder?: string;
  rows: number;
};

const MyTextarea = ({ name, label, placeholder, rows }: TMyTextarea) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Textarea
                rows={rows}
                className="bg-transparent"
                placeholder={placeholder || label}
                {...field}
              />
            </FormControl>
            <FormMessage>{error?.message}</FormMessage>
          </FormItem>
        );
      }}
    />
  );
};

export default MyTextarea;
