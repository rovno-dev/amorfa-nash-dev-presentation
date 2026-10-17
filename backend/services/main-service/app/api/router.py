from fastapi import APIRouter

from app.api.v1 import notes

router = APIRouter(prefix="/v1")
router.include_router(notes.router)
