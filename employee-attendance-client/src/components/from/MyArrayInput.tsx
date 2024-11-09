import { HTMLInputTypeAttribute } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

type TMyArrayInput = {
  name: string;
  label: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
};

const MyArrayInput = ({ name, label, type, placeholder }: TMyArrayInput) => {
  const form = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name,
  });

  const addField = () => {
    append("");
  };

  return (
    <div>
      <FormLabel>{label}</FormLabel>
      <div className="space-y-4 mt-2">
        {fields.map((fieldItem, index) => (
          <FormField
            key={fieldItem.id}
            name={`${name}.${index}`}
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input
                        type={type}
                        className="bg-transparent"
                        placeholder={placeholder || label}
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        className="h-12"
                        disabled={fields.length <= 1}
                        onClick={() => remove(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  </FormControl>
                  {error && <FormMessage>{error.message}</FormMessage>}
                </>
              </FormItem>
            )}
          />
        ))}

        {/* Add button outside of the loop */}
        <Button
          type="button"
          onClick={addField}
          className="w-full border border-dashed"
          variant="outline"
        >
          Add <Plus className="size-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default MyArrayInput;
