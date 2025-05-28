from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import applications, users
from app.routes import session as session_routes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000"
    ],  # add additional frontend origins as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(
    applications.router, prefix="/api/applications", tags=["applications"]
)
app.include_router(session_routes.router, prefix="/api/session", tags=["session"])
