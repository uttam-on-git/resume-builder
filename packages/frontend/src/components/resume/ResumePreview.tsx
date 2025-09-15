import { ResumeFormValues } from "./ZodSchema";

interface ResumePreviewProps {
  data: Partial<ResumeFormValues>;
}

export function ResumePreview({ data }: ResumePreviewProps) {
  return (
    <div className="prose prose-sm max-w-none p-6 bg-white rounded-lg shadow-sm">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-1">
          {data.fullName || "Your Name"}
        </h1>
        <div className="text-xs text-gray-600 flex justify-center items-center gap-x-4">
          <span>{data.email || "your.email@example.com"}</span>
          {data.phoneNumber && <span>| {data.phoneNumber}</span>}
          {data.address && <span>| {data.address}</span>}
        </div>
        <div className="text-xs text-blue-600 flex justify-center items-center gap-x-4 mt-1">
          {data.linkedIn && (
            <a href={data.linkedIn} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          )}
          {data.website && (
            <a href={data.website} target="_blank" rel="noopener noreferrer">
              Portfolio
            </a>
          )}
        </div>
      </header>

      {data.summary && (
        <section className="mb-4">
          {" "}
          <h2 className="text-sm font-bold uppercase tracking-wider border-b-2 border-gray-300 pb-1 mb-2">
            Summary
          </h2>{" "}
          <p className="text-sm">{data.summary}</p>{" "}
        </section>
      )}

      {data.experiences && data.experiences.length > 0 && (
        <section className="mb-4">
          {" "}
          <h2 className="text-sm font-bold uppercase tracking-wider border-b-2 border-gray-300 pb-1 mb-2">
            Experience
          </h2>{" "}
          {data.experiences.map((exp, index) => (
            <div key={index} className="mt-2">
              {" "}
              <h3 className="font-semibold text-base">
                {exp.jobTitle || "Job Title"}
              </h3>{" "}
              <p className="text-sm italic text-gray-700">
                {exp.company || "Company"}
              </p>{" "}
            </div>
          ))}{" "}
        </section>
      )}

      {data.educations && data.educations.length > 0 && (
        <section className="mb-4">
          {" "}
          <h2 className="text-sm font-bold uppercase tracking-wider border-b-2 border-gray-300 pb-1 mb-2">
            Education
          </h2>{" "}
          {data.educations.map((edu, index) => (
            <div key={index} className="mt-2">
              {" "}
              <h3 className="font-semibold text-base">
                {edu.school || "School"}
              </h3>{" "}
              <p className="text-sm italic text-gray-700">
                {edu.degree || "Degree"}
              </p>{" "}
            </div>
          ))}{" "}
        </section>
      )}

      {data.skills && data.skills.length > 0 && (
        <section>
          {" "}
          <h2 className="text-sm font-bold uppercase tracking-wider border-b-2 border-gray-300 pb-1 mb-2">
            Skills
          </h2>{" "}
          <div className="flex flex-wrap gap-2 mt-2">
            {" "}
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
              >
                {skill.name}
              </span>
            ))}{" "}
          </div>{" "}
        </section>
      )}
    </div>
  );
}
