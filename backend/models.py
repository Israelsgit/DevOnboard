from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class RepoMetadata(BaseModel):
    name: str
    description: Optional[str] = None
    stars: int
    forks: int
    languages: Dict[str, int]
    license: Optional[str] = None
    last_updated: str

class CommitStats(BaseModel):
    week: str
    count: int

class FileNode(BaseModel):
    path: str
    type: str  # "blob" or "tree"
    children: Optional[List['FileNode']] = None

class RepoSummary(BaseModel):
    summary: str
    tech_stack: List[str]
    key_components: List[str]
    entry_points: List[str]
    onboarding_steps: List[str]

class ValidateRequest(BaseModel):
    url: str

class ValidateResponse(BaseModel):
    owner: str
    repo: str
    valid: bool
