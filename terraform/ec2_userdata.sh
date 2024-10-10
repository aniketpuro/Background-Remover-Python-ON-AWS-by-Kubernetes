#!/bin/bash
# Install Docker
yum update -y
amazon-linux-extras install docker -y
service docker start
usermod -a -G docker ec2-user

# Clone your Flask app repository
git clone https://github.com/yeshwanthlm/background-remover-python-app.git
cd background-remover-python-app

# Build and run the Docker container
docker build -t flask-rmbg-app .
docker run -d -p 5100:5100 flask-rmbg-app
