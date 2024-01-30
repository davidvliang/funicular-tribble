# 
FROM python:3.11

# 
WORKDIR /opt

# 
COPY ./requirements.txt /opt/requirements.txt

# 
RUN pip install --no-cache-dir --upgrade -r /opt/requirements.txt

#
expose 5001

# 
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "5001", "--reload"]