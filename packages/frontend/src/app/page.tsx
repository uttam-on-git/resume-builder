import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex-1 items-center justify-center">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Build Your Professional Resume in Minutes
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Our intuitive resume builder helps you create a stunning,
                professional resume that stands out to employers.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/dashboard">
                <Button className='cursor-pointer'>Get Started</Button>
              </Link>
              <Link href="/#features">
                <Button variant="outline" className='cursor-pointer'>Learn More</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}