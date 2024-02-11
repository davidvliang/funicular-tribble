from labjack import ljm

# handle = ljm.openS("ANY", "ANY", "ANY")
handle = ljm.openS("T7", "WIFI", "192.168.50.245")

info = ljm.getHandleInfo(handle)

print(f"Device Type: {info[0]}\n \
        Connection Type: {info[1]}\n \
        Serial Number: {info[2]}\n \
        IP Address: {ljm.numberToIP(info[3])}\n \
        Port: {info[4]}\n \
        Max Bytes per MB: {info[5]}\n")

input()