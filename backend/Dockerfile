FROM ubuntu:20.04


RUN apt-get update
RUN apt-get install -y wget python3-pip vim libusb-1.0-0-dev udev

WORKDIR /opt

RUN wget https://files.labjack.com/installers/LJM/Linux/x64/release/labjack_ljm_software_2019_07_16_x86_64.tar.gz
RUN tar -zxf ./labjack_ljm_software_2019_07_16_x86_64.tar.gz
RUN /opt/labjack_ljm_software_2019_07_16_x86_64/labjack_ljm_installer.run -- --no-restart-device-rules 

# RUN wget https://files.labjack.com/installers/LJM/Linux/x64/beta/LabJack-LJM_2023-06-23.zip
# RUN unzip ./LabJack-LJM_2023-11-20.zip
# RUN /opt/LabJack-LJM_2023-11-20/labjack_ljm_installer.run 


COPY ./requirements.txt /opt/requirements.txt

RUN pip3 install --no-cache-dir --upgrade -r /opt/requirements.txt

EXPOSE 8000

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
# uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload
