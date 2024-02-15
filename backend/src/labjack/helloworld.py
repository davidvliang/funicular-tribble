from labjack import ljm
import time 

def labjack_test(stop_button_event, input_string):

#     handle = ljm.openS("ANY", "ANY", "ANY")
    handle = ljm.openS("T7", "WIFI", "192.168.50.245")

    info = ljm.getHandleInfo(handle)

    print(f"Device Type: {info[0]}\n \
            Connection Type: {info[1]}\n \
            Serial Number: {info[2]}\n \
            IP Address: {ljm.numberToIP(info[3])}\n \
            Port: {info[4]}\n \
            Max Bytes per MB: {info[5]}\n")




    ## Process JSON Input
    arr_size = input_string["arrayDimension"]
    bitness = input_string["bitness"]
    configuration = input_string["configuration"]

    ## Print Input to STDOUT 
    print(f"Reading JSON...\n", 
        f"   Array Size:       {arr_size}x{arr_size}\n",
        f"   Bitness:          {bitness}\n",
        f"   Configuration:    {configuration}",
        )

    ## Init event to stop program
    # stop_button = Event()

    ## Toggle signal using threaded function
    # thread = Thread(target=thread_example, args=(arr_size, configuration, stop_button_event))
    
    i = 0
    print("HELLO")
    while i < 100:
        print(i, end=" ", flush=True)
        i += 1
        time.sleep(1)
        if stop_button_event.is_set():
            break
    print("Program Stopped.")
    stop_button_event.clear()