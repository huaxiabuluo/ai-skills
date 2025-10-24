import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-bold mb-8">About {{PROJECT_NAME}}</h1>
        <p className="text-xl text-gray-600 mb-12 leading-relaxed">
          This is a modern Next.js application built with the App Router pattern,
          TypeScript for type safety, and Tailwind CSS for styling. It provides
          excellent performance, developer experience, and SEO out of the box.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">🚀 Performance</h2>
            <p className="text-gray-600">
              Built with Next.js 14+ featuring server components, optimized bundle sizes,
              and automatic code splitting.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">🎨 Styling</h2>
            <p className="text-gray-600">
              Styled with Tailwind CSS for rapid UI development with consistent
              design patterns and responsive design.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">🛡️ Type Safety</h2>
            <p className="text-gray-600">
              Fully typed with TypeScript to catch errors early and improve
              developer productivity and code quality.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">🧪 Testing</h2>
            <p className="text-gray-600">
              Comes with Jest and React Testing Library setup for comprehensive
              testing capabilities.
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
        >
          Back Home
        </Link>
      </div>
    </main>
  );
}