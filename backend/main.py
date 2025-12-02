import sys
import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Ensure current directory is in sys.path
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.append(current_dir)

logger.info(f"Current directory: {current_dir}")
logger.info(f"Sys.path: {sys.path}")

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

try:
    from api.routes import router
except ImportError as e:
    logger.error(f"Import Error: {e}")
    # Define a dummy router if import fails to allow app to start and show error
    from fastapi import APIRouter
    router = APIRouter()
    @router.get("/error")
    def error():
        return {"error": str(e)}

load_dotenv()

app = FastAPI(title="Devonboard API", version="0.1.0")

# Global Exception Handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global error: {exc}")
    return JSONResponse(
        status_code=500,
        content={"message": f"A server error has occurred: {str(exc)}"},
    )

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all for MVP
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
async def root():
    return {"message": "Devonboard API is running", "sys_path": sys.path}
