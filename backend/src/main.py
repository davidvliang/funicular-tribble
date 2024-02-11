from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_socketio import SocketManager
from pydantic import BaseModel

from typing import Union

from .daq.demux_redux import ControlSystem
from .daq.antenna_pattern_plot import generate_antenna_pattern

app = FastAPI()
# sio = SocketManager(app=app)

class Configuration(BaseModel):
    arrayDimension: str
    bitness: str
    frequency: str
    configuration: dict


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

is_running = 0
cell_configuration = {}

def get_server_status():
    return str(is_running)

@app.get("/")
def root():
    return get_server_status()


@app.post("/daq")
async def submit_configuration():
    global is_running
    is_running += 1
    return {
        "data": { is_running }
    }

# @app.get("/pattern")
# def get_pattern(data):
#     return generate_antenna_pattern(data)
#     # return "hello"

@app.post("/pattern")
async def get_pattern(data: Configuration):
    json_input = data.dict()
    result = generate_antenna_pattern(json_input)
    return result
    # return data.json()
    # return data

# @app.sio.on('join')
# async def handle_join(sid, *args, **kwargs):
#     await app.sio.emit('lobby', 'User joined')

# @app.get("/pattern")
# def get_antenna_pattern(data):
    
#     return generate_antenna_pattern(data)