from typing import Optional, TypeVar
from fastapi import FastAPI
from pydantic import BaseModel
from redis import Redis
from rq import Queue
import astro

app = FastAPI()

DataT = TypeVar('DataT')

class Body(BaseModel):
    event: str
    created_at: str
    model: Optional[str] = None
    entry: Optional[DataT] = None
    media: Optional[DataT] = None


@app.post("/")
async def root(body: Body):
    q = Queue(connection=Redis())
    q.enqueue(astro.build, body)
    return {"message": "Hello World"}