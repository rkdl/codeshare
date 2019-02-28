FROM python:3.6.6

RUN apt-get update && \
 apt-get -y install\
    gcc \
    libc-dev \
    libffi-dev

WORKDIR /app
ENV HOME /app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY runserver.py runserver.py
