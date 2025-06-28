FROM python:3.9-slim

# set the working directory
WORKDIR /app
# install build dependencies for numpy and rembg
RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    python3-dev \
    libffi-dev \
    && apt-get clean

# update pip
RUN pip install --upgrade pip setuptools wheel

# pre install numpy to avoid rebuild from source
RUN pip install numpy==1.24.4

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5100

CMD ["gunicorn", "--bind", "0.0.0.0:5100", "app:app", "--workers=2", "--timeout", "120"]
