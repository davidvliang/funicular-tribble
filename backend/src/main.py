from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_socketio import SocketManager
from pydantic import BaseModel
from typing import Union
import asyncio
from threading import Thread, Event

from typing import Union

from .daq.demux_redux import ControlSystem
from .daq.antenna_pattern_plot import generate_antenna_pattern
from .daq.example import example, background_task, async_example, thread_example
from .labjack.helloworld import labjack_test

app = FastAPI()
# sio = SocketManager(app=app)



class Configuration(BaseModel):
    arrayDimension: Union[int, str]
    bitness: Union[int, str]
    frequency: Union[int, str]
    configuration: dict


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

stop_button_event = Event()
debug_clicker = 0
cell_configuration = {}
is_running = False

def get_server_status():
    print("GETTING STATUS")
    return {
        "status": is_running, 
        "configuration": cell_configuration,
    }


@app.on_event("startup")
async def startup_event():
    print("CREATING BACKGROUND TASK")
    # asyncio.create_task(background_task(stop_button_event))


@app.get("/")
def root():
    return get_server_status()


@app.post("/debug")
async def submit_configuration():
    global debug_clicker
    debug_clicker += 1
    return {
        "data": { debug_clicker }
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
    
    
@app.post("/example")
async def get_pattern(data: Configuration):
    global is_running
    global cell_configuration
    is_running = True
    cell_configuration = data.dict()
    
    thread = Thread(target=labjack_test, args=(stop_button_event, cell_configuration))
    thread.start()
    return {"confirm": "Done"} 
    # result = example(json_input)
    # return data.json()
    # return data

@app.get("/stop_program")
async def trigger_stop():
    global is_running
    global cell_configuration
    stop_button_event.set()
    is_running = False
    cell_configuration = {}
    return {"message": "Stop Button Pressed"}
    

# @app.sio.on('join')
# async def handle_join(sid, *args, **kwargs):
#     await app.sio.emit('lobby', 'User joined')

# @app.get("/pattern")
# def get_antenna_pattern(data):
    
#     return generate_antenna_pattern(data)