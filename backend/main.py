from contextlib import asynccontextmanager
from typing import AsyncGenerator
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel
import asyncpg  # Make sure to install asyncpg


# Lifespan function to manage database connection
@asynccontextmanager
async def lifespan(my_app: FastAPI) -> AsyncGenerator:
    my_app.state.db = await asyncpg.connect(DATABASE_URL)
    yield  # This will run the application
    await my_app.state.db.close()  # Close the database connection on shutdown


# Use the lifespan in the FastAPI app
app = FastAPI(lifespan=lifespan)

# Allow CORS for all origins (you can restrict this to specific origins if needed)
app.add_middleware(
    CORSMiddleware,
    # List of allowed origins, use ["http://localhost:3000"] for specific frontend
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Update with your actual database credentials
DATABASE_URL = "postgresql://pguser:pgpass@db:5432/visadb"


# Convert inputs to camel_case
class BaseSchema(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True,
    )


# Define the Pydantic model for user data
class UserData(BaseSchema):
    first_name: str
    last_name: str


@app.post("/api/users")
async def create_user(user_data: UserData):
    conn = app.state.db  # Use the connection stored in app.state
    try:
        # Insert the user data into the database
        await conn.execute(
            "INSERT INTO users(first_name, last_name) VALUES($1, $2)",
            user_data.first_name,
            user_data.last_name,
        )
        return {"message": "User added successfully!"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e)) from e
