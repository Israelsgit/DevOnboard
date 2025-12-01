"use client";

import { FileNode } from "@/lib/api";
import { Folder, FileCode, ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FileTreeNodeProps {
    node: FileNode;
    level?: number;
}

function FileTreeNode({ node, level = 0 }: FileTreeNodeProps) {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = node.type === "tree" && node.children && node.children.length > 0;

    return (
        <div>
            <div
                className={cn(
                    "flex items-center py-1 px-2 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer rounded text-sm",
                    level > 0 && "ml-4"
                )}
                onClick={() => hasChildren && setIsOpen(!isOpen)}
            >
                {node.type === "tree" ? (
                    <>
                        {hasChildren ? (
                            isOpen ? <ChevronDown className="h-4 w-4 mr-1" /> : <ChevronRight className="h-4 w-4 mr-1" />
                        ) : (
                            <div className="w-5" />
                        )}
                        <Folder className="h-4 w-4 mr-2 text-blue-500" />
                    </>
                ) : (
                    <>
                        <div className="w-5" />
                        <FileCode className="h-4 w-4 mr-2 text-gray-500" />
                    </>
                )}
                <span className="whitespace-nowrap">{node.path}</span>
            </div>
            {isOpen && hasChildren && (
                <div>
                    {node.children!.map((child) => (
                        <FileTreeNode key={child.path} node={child} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    );
}

interface FileTreeProps {
    tree: FileNode[];
}

export function FileTree({ tree }: FileTreeProps) {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="text-lg">File Explorer</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="px-4 pb-4 overflow-x-auto">
                    <div className="min-w-max">
                        {tree.map((node) => (
                            <FileTreeNode key={node.path} node={node} />
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
