from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Union

from .daq.demux_redux import ControlSystem

app = FastAPI()

origins = [
    "http://localhost:5173",
    "localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

is_running = 0
cell_configuration = {}

def get_server_status():
    return "World STATUS IS FINE" + " " + str(is_running)

@app.get("/")
def read_root():
    return get_server_status()


@app.post("/daq")
async def submit_configuration():
    global is_running
    is_running += 1
    return {
        "data": { is_running }
    }

