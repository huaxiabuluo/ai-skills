import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Welcome to {{PROJECT_NAME}}
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        A React + TypeScript + Vite + Tailwind CSS application
      </p>
      <Link
        to="/about"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Learn More
      </Link>
    </div>
  )
}

export default Home