import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        About {{PROJECT_NAME}}
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl text-center">
        This is a modern React application built with TypeScript, Vite, and Tailwind CSS.
        It includes ESLint for code quality, Husky for Git hooks, and Vitest for testing.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Back Home
      </Link>
    </div>
  )
}

export default About