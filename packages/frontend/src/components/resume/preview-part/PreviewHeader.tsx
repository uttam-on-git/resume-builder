import { ResumeFormValues } from "../ZodSchema";

export function PreviewHeader({ data }: { data: Partial<ResumeFormValues> }) {
  return (
    <header className="text-center mb-8">
      <h1 className="text-4xl font-bold tracking-tight text-slate-800">
        {data.fullName || 'Your Name'}
      </h1>
      <div className="mt-2 flex items-center justify-center gap-x-4 text-sm text-slate-500">
        {data.email && <span>{data.email}</span>}
        {data.phoneNumber && <span className="hidden sm:inline">|</span>}
        {data.phoneNumber && <span>{data.phoneNumber}</span>}
        {data.address && <span className="hidden sm:inline">|</span>}
        {data.address && <span>{data.address}</span>}
      </div>
      <div className="mt-1 flex items-center justify-center gap-x-4 text-sm text-blue-600">
        {data.linkedIn && <a href={data.linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
        {data.website && <span>|</span>}
        {data.website && <a href={data.website} target="_blank" rel="noopener noreferrer">Portfolio</a>}
      </div>
    </header>
  );
}