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
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";

export function ExperienceForm() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Work Experience</CardTitle>
        <CardDescription>Detail your professional history.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="p-4 border rounded-md relative space-y-4"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={control}
                name={`experiences.${index}.jobTitle`}
                render={({ field }) => (
                  <FormItem>
                    {" "}
                    <FormLabel>Job Title</FormLabel>{" "}
                    <FormControl>
                      <Input placeholder="Software Engineer" {...field} />
                    </FormControl>{" "}
                    <FormMessage />{" "}
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`experiences.${index}.company`}
                render={({ field }) => (
                  <FormItem>
                    {" "}
                    <FormLabel>Company</FormLabel>{" "}
                    <FormControl>
                      <Input placeholder="Google" {...field} />
                    </FormControl>{" "}
                    <FormMessage />{" "}
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`experiences.${index}.location`}
                render={({ field }) => (
                  <FormItem>
                    {" "}
                    <FormLabel>Location</FormLabel>{" "}
                    <FormControl>
                      <Input placeholder="City, State" {...field} />
                    </FormControl>{" "}
                    <FormMessage />{" "}
                  </FormItem>
                )}
              />
              <div />
              <FormField
                control={control}
                name={`experiences.${index}.startDate`}
                render={({ field }) => (
                  <FormItem>
                    {" "}
                    <FormLabel>Start Date</FormLabel>{" "}
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>{" "}
                    <FormMessage />{" "}
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`experiences.${index}.endDate`}
                render={({ field }) => (
                  <FormItem>
                    {" "}
                    <FormLabel>End Date</FormLabel>{" "}
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>{" "}
                    <FormMessage />{" "}
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={control}
              name={`experiences.${index}.description`}
              render={({ field }) => (
                <FormItem>
                  {" "}
                  <FormLabel>Description / Responsibilities</FormLabel>{" "}
                  <FormControl>
                    <Textarea
                      placeholder="Describe your role and achievements..."
                      className="min-h-[100px]"
                      {...field}
                    />
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
          onClick={() =>
            append({
              jobTitle: "",
              company: "",
              location: "",
              startDate: "",
              endDate: "",
              description: "",
            })
          }
        >
          Add Experience
        </Button>
      </CardContent>
    </Card>
  );
}