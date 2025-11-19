import httpx
from typing import Dict, Any, List
from models import RepoMetadata, CommitStats, FileNode

class GitHubService:
    BASE_URL = "https://api.github.com"

    async def validate_repo(self, owner: str, repo: str) -> bool:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{self.BASE_URL}/repos/{owner}/{repo}")
            return response.status_code == 200

    async def get_metadata(self, owner: str, repo: str) -> RepoMetadata:
        async with httpx.AsyncClient() as client:
            repo_resp = await client.get(f"{self.BASE_URL}/repos/{owner}/{repo}")
            repo_resp.raise_for_status()
            repo_data = repo_resp.json()

            langs_resp = await client.get(f"{self.BASE_URL}/repos/{owner}/{repo}/languages")
            langs_data = langs_resp.json()

            return RepoMetadata(
                name=repo_data["name"],
                description=repo_data.get("description"),
                stars=repo_data["stargazers_count"],
                forks=repo_data["forks_count"],
                languages=langs_data,
                license=repo_data["license"]["name"] if repo_data.get("license") else None,
                last_updated=repo_data["updated_at"]
            )

    async def get_commits(self, owner: str, repo: str) -> List[CommitStats]:
        async with httpx.AsyncClient() as client:
            # Get last 100 commits to calculate weekly stats roughly
            response = await client.get(f"{self.BASE_URL}/repos/{owner}/{repo}/commits?per_page=100")
            response.raise_for_status()
            commits = response.json()
            
            # Simple aggregation by week (mock logic for MVP simplicity or real aggregation)
            # For MVP, let's just return a simple count per day for the last 7 days or similar
            # Or better, just map the last few commits to show activity
            
            # Let's do a simple "commits per week" aggregation for the last 4 weeks
            from collections import defaultdict
            from datetime import datetime, timedelta
            
            stats = defaultdict(int)
            now = datetime.now()
            
            for commit in commits:
                date_str = commit["commit"]["author"]["date"]
                date = datetime.fromisoformat(date_str.replace("Z", "+00:00"))
                # Group by week start
                week_start = date - timedelta(days=date.weekday())
                week_key = week_start.strftime("%Y-%m-%d")
                stats[week_key] += 1
                
            return [CommitStats(week=k, count=v) for k, v in sorted(stats.items(), reverse=True)[:10]]

    async def get_tree(self, owner: str, repo: str) -> List[FileNode]:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{self.BASE_URL}/repos/{owner}/{repo}/git/trees/main?recursive=1")
            if response.status_code != 200:
                 response = await client.get(f"{self.BASE_URL}/repos/{owner}/{repo}/git/trees/master?recursive=1")
            
            response.raise_for_status()
            data = response.json()
            
            # Convert flat tree to hierarchy
            # This is a simplified version. For full tree, we need a proper parser.
            # For MVP, let's return the top-level structure or a simplified list
            
            # Let's build a simple hierarchy
            root_nodes = []
            nodes_map = {}
            
            # Sort by path length to ensure parents are processed before children
            tree_items = sorted(data["tree"], key=lambda x: x["path"])
            
            # Limit to avoid huge trees for MVP
            tree_items = [item for item in tree_items if item["type"] in ["blob", "tree"]]
            
            # Simple hierarchy builder (naive)
            # For the MVP UI, a flat list with depth might be easier, but let's try to nest
            # Actually, let's just return the raw list and let frontend handle it? 
            # The prompt asked for "Backend fetches repository tree -> Full directory structure"
            # Let's return a simplified nested structure for the top 2 levels maybe?
            
            # Let's stick to the requested format:
            # [ { "folder": "src", "files": [...] } ]
            
            # Actually, let's implement a proper recursive builder
            
            def add_to_tree(path_parts, current_level, type_):
                if not path_parts:
                    return
                
                name = path_parts[0]
                is_last = len(path_parts) == 1
                
                existing = next((x for x in current_level if x.path == name), None)
                
                if is_last:
                    if not existing:
                        current_level.append(FileNode(path=name, type=type_, children=[] if type_ == "tree" else None))
                else:
                    if not existing:
                        existing = FileNode(path=name, type="tree", children=[])
                        current_level.append(existing)
                    if existing.children is None:
                        existing.children = []
                    add_to_tree(path_parts[1:], existing.children, type_)

            root_nodes = []
            for item in tree_items:
                # Limit depth/size for MVP performance
                if item["path"].count("/") > 4: continue 
                add_to_tree(item["path"].split("/"), root_nodes, item["type"])
                
            return root_nodes

    async def get_readme(self, owner: str, repo: str) -> str:
        async with httpx.AsyncClient() as client:
            # Try main, then master
            for branch in ["main", "master"]:
                resp = await client.get(f"https://raw.githubusercontent.com/{owner}/{repo}/{branch}/README.md")
                if resp.status_code == 200:
                    return resp.text
            return ""
