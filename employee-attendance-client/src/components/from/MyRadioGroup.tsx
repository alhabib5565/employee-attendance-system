import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

type TMyRadioGroup = {
  name: string;
  items: string[];
  onValueChange: React.Dispatch<React.SetStateAction<string>>;
};

const MyRadioGroup = ({ name, items, onValueChange }: TMyRadioGroup) => {
  const form = useFormContext();
  const value = useWatch({
    control: form.control,
    name,
  });
  useEffect(() => {
    onValueChange(value);
  }, [value, onValueChange]);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex gap-10"
            >
              {items.map((item, index) => (
                <FormItem
                  key={index}
                  className={cn(
                    "flex flex-row items-start space-x-3 space-y-0 rounded-md px-4 py-3",
                    {
                      "bg-secondary text-primary": field.value === item,
                    }
                  )}
                >
                  <FormControl>
                    <RadioGroupItem value={item} />
                  </FormControl>
                  <FormLabel className="font-normal">{item}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MyRadioGroup;
