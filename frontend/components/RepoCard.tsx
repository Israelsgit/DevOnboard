import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RepoMetadata } from "@/lib/api";
import { Star, GitFork, Calendar, Scale } from "lucide-react";

interface RepoCardProps {
    metadata: RepoMetadata;
}

export function RepoCard({ metadata }: RepoCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">{metadata.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{metadata.description}</p>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{metadata.stars} Stars</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <GitFork className="h-4 w-4 text-blue-500" />
                        <span>{metadata.forks} Forks</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Scale className="h-4 w-4 text-green-500" />
                        <span>{metadata.license || "No License"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>Updated: {new Date(metadata.last_updated).toLocaleDateString()}</span>
                    </div>
                </div>
                <div className="mt-4">
                    <h4 className="text-sm font-semibold mb-2">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                        {Object.keys(metadata.languages).slice(0, 5).map((lang) => (
                            <span key={lang} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs">
                                {lang}
                            </span>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
