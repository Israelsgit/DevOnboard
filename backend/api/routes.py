from fastapi import APIRouter, HTTPException, Depends
from models import ValidateRequest, ValidateResponse, RepoMetadata, CommitStats, FileNode, RepoSummary
from services.github_service import GitHubService
from services.gemini_service import GeminiService
import re

router = APIRouter()

def get_github_service():
    return GitHubService()

def get_gemini_service():
    return GeminiService()

def parse_github_url(url: str):
    # Matches https://github.com/owner/repo or just owner/repo
    pattern = r"(?:https?://github\.com/)?([^/]+)/([^/]+)(?:/.*)?"
    match = re.match(pattern, url)
    if not match:
        raise HTTPException(status_code=400, detail="Invalid GitHub URL format")
    return match.group(1), match.group(2).replace(".git", "")

@router.post("/repo/validate", response_model=ValidateResponse)
async def validate_repo(request: ValidateRequest, gh: GitHubService = Depends(get_github_service)):
    try:
        owner, repo = parse_github_url(request.url)
        valid = await gh.validate_repo(owner, repo)
        return ValidateResponse(owner=owner, repo=repo, valid=valid)
    except Exception:
        return ValidateResponse(owner="", repo="", valid=False)

@router.get("/repo/{owner}/{repo}/metadata", response_model=RepoMetadata)
async def get_metadata(owner: str, repo: str, gh: GitHubService = Depends(get_github_service)):
    try:
        return await gh.get_metadata(owner, repo)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.get("/repo/{owner}/{repo}/commits", response_model=list[CommitStats])
async def get_commits(owner: str, repo: str, gh: GitHubService = Depends(get_github_service)):
    try:
        return await gh.get_commits(owner, repo)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/repo/{owner}/{repo}/tree", response_model=list[FileNode])
async def get_tree(owner: str, repo: str, gh: GitHubService = Depends(get_github_service)):
    try:
        return await gh.get_tree(owner, repo)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/repo/{owner}/{repo}/summary", response_model=RepoSummary)
async def generate_summary(
    owner: str, 
    repo: str, 
    gh: GitHubService = Depends(get_github_service),
    gemini: GeminiService = Depends(get_gemini_service)
):
    try:
        readme = await gh.get_readme(owner, repo)
        # Get a simplified tree string for context
        tree_nodes = await gh.get_tree(owner, repo)
        
        def nodes_to_str(nodes, indent=0):
            result = ""
            for node in nodes:
                result += "  " * indent + f"- {node.path} ({node.type})\n"
                if node.children:
                    result += nodes_to_str(node.children, indent + 1)
            return result
            
        tree_str = nodes_to_str(tree_nodes)
        
        return await gemini.generate_summary(readme, tree_str)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
