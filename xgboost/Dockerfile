FROM python:latest
WORKDIR /opt/xgboost
COPY . .
RUN pip install -r requirements.txt
ENTRYPOINT ["python", "server.py"]
