from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import user, application

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router, prefix="/api/users", tags=["users"])
app.include_router(application.router, prefix="/api/application", tags=["applications"])