import ProjectSuggester from "@/components/ProjectSuggester"
import { ThemeToggle } from "@/components/ThemeToggle"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <header className="w-full bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">PRO-HELPER</h1>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6 transition-colors duration-200">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Project Suggester</h2>
            <ThemeToggle />
          </div>
          <p className="text-center text-gray-600 dark:text-gray-400">
          Discover your ideal project with ease!
          </p>
          <ProjectSuggester />
        </div>
      </main>
    </div>
  )
}

