"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, X, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { generateProjectIdeas } from "@/app/actions"

const techNiches = [
  "UI/UX Design",
  "App Development",
  "Web Development",
  "Data Structures and Algorithms",
  "Data Science",
  "Artificial Intelligence",
  "Machine Learning",
]

const difficultyLevels = ["Beginner", "Intermediate", "Advanced"]

const targetAudiences = ["Developers", "Students", "Businesses", "Startups"]

export default function ProjectSuggester() {
  const [niche, setNiche] = useState<string>("")
  const [difficulty, setDifficulty] = useState<string>("")
  const [audience, setAudience] = useState<string>("")
  const [projects, setProjects] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!niche || !difficulty || !audience) return

    setLoading(true)
    setError(null)
    setProjects([])

    try {
      const result = await generateProjectIdeas(niche, difficulty, audience)

      if (!result.success) {
        setError(result.error || 'Failed to generate project ideas')
        return
      }

      if (!Array.isArray(result.data)) {
        setError('Invalid response format')
        return
      }

      setProjects(result.data)
    } catch (error) {
      setError("An unexpected error occurred. Please try again.")
      console.error('Project generation error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveFilters = () => {
    setNiche("")
    setDifficulty("")
    setAudience("")
    setProjects([])
    setError(null)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Select value={niche} onValueChange={(value) => setNiche(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a tech niche" />
          </SelectTrigger>
          <SelectContent>
            {techNiches.map((niche) => (
              <SelectItem key={niche} value={niche}>
                {niche}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={difficulty} onValueChange={(value) => setDifficulty(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select difficulty level" />
          </SelectTrigger>
          <SelectContent>
            {difficultyLevels.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={audience} onValueChange={(value) => setAudience(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select target audience" />
          </SelectTrigger>
          <SelectContent>
            {targetAudiences.map((audience) => (
              <SelectItem key={audience} value={audience}>
                {audience}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button onClick={handleSubmit} disabled={!niche || !difficulty || !audience || loading} className="flex-1 min-w-[200px]">
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating Ideas...
            </>
          ) : (
            "Generate Project Ideas"
          )}
        </Button>
        <Button onClick={handleRemoveFilters} variant="outline" className="flex items-center">
          <X className="h-4 w-4" />
          Remove Filters
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {projects.length > 0 && (
        <Card className="mt-6">
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Project Ideas:</h3>
            <ul className="space-y-4">
              {projects.map((project, index) => (
                <li key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300">{project}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

