"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";

export function EducationForm() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "educations",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Education</CardTitle>
        <CardDescription>List your academic background.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="p-4 border rounded-md relative space-y-2"
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6 text-destructive"
              onClick={() => remove(index)}
            >
              {" "}
              <Trash2 className="h-4 w-4" />{" "}
            </Button>
            <FormField
              control={control}
              name={`educations.${index}.school`}
              render={({ field }) => (
                <FormItem>
                  {" "}
                  <FormLabel>School / University</FormLabel>{" "}
                  <FormControl>
                    <Input placeholder="State University" {...field} />
                  </FormControl>{" "}
                  <FormMessage />{" "}
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`educations.${index}.degree`}
              render={({ field }) => (
                <FormItem>
                  {" "}
                  <FormLabel>Degree & Field of Study</FormLabel>{" "}
                  <FormControl>
                    <Input placeholder="B.S. in Computer Science" {...field} />
                  </FormControl>{" "}
                  <FormMessage />{" "}
                </FormItem>
              )}
            />
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => append({ school: "", degree: "" })}
        >
          Add Education
        </Button>
      </CardContent>
    </Card>
  );
}
