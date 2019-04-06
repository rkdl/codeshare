FROM python:3.7

ENV PYTHONUNBUFFERED 1
ENV TZ Europe/Kiev

RUN apt-get update && \
    apt-get -y install\
    gcc \
    libc-dev \
    libffi-dev

WORKDIR /app
ENV HOME /app

COPY config config
COPY Pipfile Pipfile.lock ./

RUN pip install pipenv
RUN pipenv install --system --deploy

COPY runserver.py runserver.py
