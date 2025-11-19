"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { CommitStats } from "@/lib/api";

interface CommitGraphProps {
    stats: CommitStats[];
}

const chartConfig = {
    commits: {
        label: "Commits",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

export function CommitGraph({ stats }: CommitGraphProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Commit Activity</CardTitle>
                <CardDescription>
                    Weekly commit activity for the repository
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={stats}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <defs>
                            <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#9333ea" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#9333ea" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="week"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 10)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Area
                            dataKey="count"
                            type="natural"
                            fill="url(#fillGradient)"
                            fillOpacity={1}
                            stroke="#9333ea"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
