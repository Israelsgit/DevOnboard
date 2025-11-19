"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { api, RepoMetadata, CommitStats, FileNode, RepoSummary } from "@/lib/api";
import { RepoCard } from "@/components/RepoCard";
import { CommitGraph } from "@/components/CommitGraph";
import { FileTree } from "@/components/FileTree";
import { SummaryPanel } from "@/components/SummaryPanel";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function DashboardPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const owner = searchParams.get("owner");
    const repo = searchParams.get("repo");

    const [metadata, setMetadata] = useState<RepoMetadata | null>(null);
    const [commits, setCommits] = useState<CommitStats[]>([]);
    const [tree, setTree] = useState<FileNode[]>([]);
    const [summary, setSummary] = useState<RepoSummary | null>(null);
    const [loading, setLoading] = useState(true);
    const [summaryLoading, setSummaryLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!owner || !repo) {
            router.push("/");
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                const [metadataRes, commitsRes, treeRes] = await Promise.all([
                    api.getMetadata(owner, repo),
                    api.getCommits(owner, repo),
                    api.getTree(owner, repo),
                ]);
                setMetadata(metadataRes);
                setCommits(commitsRes);
                setTree(treeRes);
            } catch (err) {
                setError("Failed to load repository data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [owner, repo, router]);

    const handleGenerateSummary = async () => {
        if (!owner || !repo) return;
        setSummaryLoading(true);
        try {
            const summaryRes = await api.generateSummary(owner, repo);
            setSummary(summaryRes);
        } catch (err) {
            setError("Failed to generate summary.");
        } finally {
            setSummaryLoading(false);
        }
    };

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 mb-4">{error}</p>
                    <Button onClick={() => router.push("/")}>Go Back</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 lg:h-screen lg:overflow-hidden">
            <div className="border-b bg-white dark:bg-slate-900 p-4 flex items-center justify-between shadow-sm shrink-0">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" onClick={() => router.push("/")} className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Button>
                    <h1 className="text-xl font-bold truncate max-w-[300px] lg:max-w-none">
                        {owner}/{repo}
                    </h1>
                </div>
            </div>

            <div className="flex-1 p-4 lg:p-6 lg:overflow-hidden">
                {loading ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:h-full">
                        <div className="lg:col-span-2 space-y-6 lg:overflow-y-auto lg:pr-2">
                            <Skeleton className="h-48 w-full" />
                            <Skeleton className="h-64 w-full" />
                            <Skeleton className="h-96 w-full" />
                        </div>
                        <div className="lg:col-span-1 lg:h-full">
                            <Skeleton className="h-full w-full" />
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:h-full">
                        <div className="lg:col-span-2 space-y-6 lg:overflow-y-auto lg:pr-2 lg:pb-6">
                            {metadata && <RepoCard metadata={metadata} />}
                            {commits.length > 0 && <CommitGraph stats={commits} />}
                            {tree.length > 0 && <FileTree tree={tree} />}
                        </div>
                        <div className="lg:col-span-1 lg:h-full lg:overflow-hidden">
                            <SummaryPanel
                                summary={summary}
                                onGenerate={handleGenerateSummary}
                                loading={summaryLoading}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
