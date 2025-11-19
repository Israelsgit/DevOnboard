"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github } from "lucide-react";
import { api } from "@/lib/api";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleAnalyze = async () => {
    if (!url) return;
    setLoading(true);
    setError("");

    try {
      const result = await api.validateRepo(url);
      if (result.valid) {
        router.push(`/dashboard?owner=${result.owner}&repo=${result.repo}`);
      } else {
        setError("Invalid GitHub repository URL or repository not found.");
      }
    } catch (err) {
      setError("An error occurred while validating the repository.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-50 dark:bg-slate-950">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto bg-slate-100 p-3 rounded-full w-fit mb-4">
            <Github className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl font-bold">Devonboard</CardTitle>
          <CardDescription>
            Enter a GitHub repository URL to generate an AI-powered onboarding summary.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <Input
              placeholder="https://github.com/owner/repo"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button onClick={handleAnalyze} disabled={loading} className="w-full">
              {loading ? "Analyzing..." : "Analyze Repository"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
