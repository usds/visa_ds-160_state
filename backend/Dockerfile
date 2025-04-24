# https://fastapi.tiangolo.com/deployment/docker/#create-the-fastapi-code
FROM mcr.microsoft.com/devcontainers/python
RUN apt-get update 

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE=1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED=1

WORKDIR /code

# Install pip requirements
COPY requirements.txt /code/requirements.txt
RUN python -m pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY . /code

# Creates a non-root user with an explicit UID and adds permission to access the /code folder
# For more info, please refer to https://aka.ms/vscode-docker-python-configure-containers
RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /code
USER appuser

# run fastapi per https://fastapi.tiangolo.com/deployment/docker/#dockerfile
CMD ["fastapi", "run", "main.py", "--host", "0.0.0.0", "--port", "8000"]
# CMD ["uvicorn", "main:backend", "--host", "0.0.0.0", "--port", "8000"]