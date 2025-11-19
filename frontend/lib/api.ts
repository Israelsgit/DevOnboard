import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export interface RepoMetadata {
    name: str;
    description: string | null;
    stars: number;
    forks: number;
    languages: Record<string, number>;
    license: string | null;
    last_updated: string;
}

export interface CommitStats {
    week: string;
    count: number;
}

export interface FileNode {
    path: string;
    type: 'blob' | 'tree';
    children?: FileNode[];
}

export interface RepoSummary {
    summary: string;
    tech_stack: string[];
    key_components: string[];
    entry_points: string[];
    onboarding_steps: string[];
}

export const api = {
    validateRepo: async (url: string) => {
        const response = await axios.post(`${API_BASE_URL}/repo/validate`, { url });
        return response.data;
    },

    getMetadata: async (owner: string, repo: string) => {
        const response = await axios.get<RepoMetadata>(`${API_BASE_URL}/repo/${owner}/${repo}/metadata`);
        return response.data;
    },

    getCommits: async (owner: string, repo: string) => {
        const response = await axios.get<CommitStats[]>(`${API_BASE_URL}/repo/${owner}/${repo}/commits`);
        return response.data;
    },

    getTree: async (owner: string, repo: string) => {
        const response = await axios.get<FileNode[]>(`${API_BASE_URL}/repo/${owner}/${repo}/tree`);
        return response.data;
    },

    generateSummary: async (owner: string, repo: string) => {
        const response = await axios.post<RepoSummary>(`${API_BASE_URL}/repo/${owner}/${repo}/summary`);
        return response.data;
    }
};
