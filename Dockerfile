FROM python:3.9
RUN pip install pipenv
WORKDIR .
COPY . .
RUN apt-get update -y
RUN apt install libgl1-mesa-glx -y
RUN pipenv install --system
CMD gunicorn server:noapp -b 0.0.0.0:8080
