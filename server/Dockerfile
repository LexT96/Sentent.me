# syntax=docker/dockerfile:1

FROM python:3.8-slim-buster
WORKDIR /
COPY Pipfile Pipfile
RUN pip3 install pipenv
RUN pipenv install --deploy --ignore-pipfile
COPY . .
EXPOSE 5000
CMD [ "pipenv", "run" , "flask", "run"]