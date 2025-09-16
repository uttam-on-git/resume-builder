import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center gap-6 p-4 text-center">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
          Build Your Professional Resume in Minutes
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
          Our intuitive resume builder helps you create a stunning, professional
          resume that stands out to employers.
        </p>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Link href="/dashboard">
          <Button>Get Started</Button>
        </Link>
        <Link href="/#features">
          <Button variant="outline">Learn More</Button>
        </Link>
      </div>
    </main>
  );
}