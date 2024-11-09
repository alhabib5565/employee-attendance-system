import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Check, ChevronsUpDown } from "lucide-react";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type TSelectOption = {
  label: string;
  value: string;
};

type TMySelect = {
  name: string;
  label: string;
  placeholder: string;
  isGrid?: boolean;
  options: TSelectOption[];
  isSuggestion: boolean;
};

const MySelect = ({
  name,
  label,
  placeholder,
  isGrid,
  options,
  isSuggestion,
}: TMySelect) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <>
            {isSuggestion ? (
              <FormField
                control={form.control}
                name={name}
                render={({ field, fieldState: { error } }) => {
                  console.log(error, "select error");
                  return (
                    <FormItem
                      className={cn({
                        "grid grid-cols-7 w-full gap-4 items-center": isGrid,
                      })}
                    >
                      <FormLabel
                        className={cn({
                          "col-span-2": isGrid,
                        })}
                      >
                        {label}
                      </FormLabel>
                      <div
                        className={cn("space-y-2", {
                          "col-span-5": isGrid,
                        })}
                      >
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-full justify-between",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? options.find(
                                      (item) => item.value === field.value
                                    )?.label
                                  : `${placeholder || label}`}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command className="w-full">
                              <CommandInput placeholder={"search..."} />
                              <CommandList>
                                <CommandEmpty>No data found.</CommandEmpty>
                                <CommandGroup>
                                  {options.map((item) => (
                                    <CommandItem
                                      value={item.label}
                                      key={item.value}
                                      onSelect={() => {
                                        form.setValue(name, item.value);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          item.value === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {item.label}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>

                        <FormMessage>{error?.message}</FormMessage>
                      </div>
                    </FormItem>
                  );
                }}
              />
            ) : (
              <FormItem
                className={cn({
                  "grid grid-cols-7 gap-4 items-center": isGrid,
                })}
              >
                <FormLabel
                  className={cn({
                    "col-span-2": isGrid,
                  })}
                >
                  {label}
                </FormLabel>
                <FormControl
                  className={cn({
                    "col-span-5 ": isGrid,
                  })}
                >
                  <div className="flex flex-col gap-2">
                    <Select
                      {...field}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full min-w-[200px] bg-transparent">
                        <SelectValue placeholder={placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {options.map((opt, index) => (
                          <SelectItem key={index} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage>{error?.message}</FormMessage>
                  </div>
                </FormControl>
              </FormItem>
            )}
          </>
        );
      }}
    />
  );
};

export default MySelect;
