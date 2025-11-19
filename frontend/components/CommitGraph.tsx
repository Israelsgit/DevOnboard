"use client";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CommitStats } from "@/lib/api";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface CommitGraphProps {
    stats: CommitStats[];
}

export function CommitGraph({ stats }: CommitGraphProps) {
    const data = {
        labels: stats.map(s => s.week),
        datasets: [
            {
                label: 'Commits',
                data: stats.map(s => s.count),
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                tension: 0.3,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Commit Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <Line options={options} data={data} />
            </CardContent>
        </Card>
    );
}
