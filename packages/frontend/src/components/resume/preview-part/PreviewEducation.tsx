import { formatDate } from "@/lib/utils";
import { ResumeFormValues } from "../ZodSchema";

export function PreviewEducation({ data }: { data: Partial<ResumeFormValues> }) {
  if (!data.educations || data.educations.length === 0) return null;
  return (
    <section className="mt-6">
      <h2 className="text-lg font-semibold uppercase tracking-wide text-slate-700 border-b-2 border-slate-300 pb-1 mb-2">
        Education
      </h2>
      <div className="space-y-3">
        {data.educations.map((edu, index) => (
          <div key={index}>
            <div className="flex justify-between items-baseline">
              <h3 className="text-base font-semibold text-slate-800">{edu.school}</h3>
              <div className="text-xs font-medium text-slate-500">
                <span>{formatDate(edu.startDate)}</span> - <span>{formatDate(edu.endDate)}</span>
              </div>
            </div>
            <p className="text-sm text-slate-600">{edu.degree}{edu.fieldOfStudy && `, ${edu.fieldOfStudy}`}</p>
          </div>
        ))}
      </div>
    </section>
  );
}