FROM python:3.6.6

ENV PYTHONUNBUFFERED 1
ENV TZ Europe/Kiev

RUN apt-get update && \
    apt-get -y install\
    gcc \
    libc-dev \
    libffi-dev

WORKDIR /app
ENV HOME /app

COPY runserver.py Pipfile Pipfile.lock ./

COPY config config

RUN pip install --no-cache-dir pipenv && \
    pipenv install --system --deploy --ignore-pipfile
