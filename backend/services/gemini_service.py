import google.generativeai as genai
import os
from typing import Dict, Any
from models import RepoSummary
import json

class GeminiService:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            # Fallback or error. For MVP we expect it to be there.
            pass
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-2.0-flash')

    async def generate_summary(self, readme_content: str, file_tree_str: str) -> RepoSummary:
        prompt = f"""
        You are Devonboard, an AI that summarizes repositories for onboarding new developers.

        Summarize the following repository based on its README and file structure.
        Return the response in strict JSON format matching this structure:
        {{
            "summary": "High-level purpose...",
            "tech_stack": ["React", "FastAPI", ...],
            "key_components": ["auth module", "payment gateway", ...],
            "entry_points": ["src/main.py", "app/index.js"],
            "onboarding_steps": ["1. Clone repo", "2. Install dependencies..."]
        }}

        README:
        {readme_content[:10000]} 

        DIRECTORY TREE (truncated):
        {file_tree_str[:5000]}
        """

        try:
            response = await self.model.generate_content_async(prompt)
            text = response.text
            # Clean up markdown code blocks if present
            if text.startswith("```json"):
                text = text[7:]
            if text.endswith("```"):
                text = text[:-3]
            
            data = json.loads(text)
            return RepoSummary(**data)
        except Exception as e:
            print(f"Gemini Error: {e}")
            # Return fallback
            return RepoSummary(
                summary="Could not generate summary.",
                tech_stack=[],
                key_components=[],
                entry_points=[],
                onboarding_steps=[]
            )
