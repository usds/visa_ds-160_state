from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import applications, users

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(
    applications.router, prefix="/api/applications", tags=["applications"]
)
