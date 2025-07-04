Background-Remover-Python-ON-AWS-by-Kubernetes

![image](https://github.com/user-attachments/assets/24105cd8-295e-454f-a04a-f72a88fd0713)

🚀 Project Overview
Background-Remover-Python-ON-AWS-by-Kubernetes is a Python-based application that removes image backgrounds using machine learning models. This project is containerized with Docker, orchestrated with Kubernetes, and deployed on AWS for scalable cloud-based performance.

📂 Project Structure
```
Background-Remover-Python-ON-AWS-by-Kubernetes/
│
├── ansible/
│   ├── inventory              # Ansible inventory file for defining hosts
│   ├── setup.yml              # Ansible playbook for installing Jenkins, Docker, Trivy, and Docker Scout
│   └── roles/                 # Optional: for organizing more complex roles
│
├── kubernetes/
│   ├── deployment.yaml       # Kubernetes deployment configurations
│   ├── service.yaml          # Kubernetes service for accessing the app
|   ├── node-svc.yaml         # Kubernetes Node service for exproting Nodeport
│
├── terraform/
│   ├── main.tf               # Terraform configurations for AWS infrastructure
│   ├── variables.tf          # Variable definitions for Terraform
│   ├── outputs.tf            # Outputs for AWS resources
|   ├── provider.tf           # AWS privider detiles
|
├── templates
|   ├── index.html            # HTML Landing page of Image Background Remover
│
├── Dockerfile                # Dockerfile for containerizing the Python app
├── JenkinsPipelineScript.sh  # Jenkins Pipeline script for CI/CD
├── app.py                    # Main Python application code for background removal
├── requirements.txt          # Python dependencies for the app

```
✨ Features
Automated Background Removal: Leverages Python and machine learning for precise background removal.
Containerized with Docker: Easily deploy and scale the app using Docker containers.
Kubernetes Orchestration: Manages containers using Kubernetes, ensuring availability and scalability.
AWS Deployment: Uses Terraform to automate AWS infrastructure setup, making deployment seamless.
CI/CD Pipeline: Configured Jenkins pipeline for continuous integration and deployment.
🌐 Live Demo
Click here to see the live demo (Replace this with your deployed URL)

🛠️ Prerequisites
Before you begin, ensure you have the following installed:

Python 3.7+
Docker
Kubernetes (kubectl)
AWS CLI
Terraform
Jenkins
🚀 Getting Started
1. Clone the Repository
```
git clone https://github.com/aniketpuro/Background-Remover-Python-ON-AWS-by-Kubernetes.git
cd Background-Remover-Python-ON-AWS-by-Kubernetes
```
2. Set Up the Environment
Install the required Python dependencies:

```
pip install -r requirements.txt
```
3. Build and Run the Docker Container
```
docker build -t background-remover-app .
docker run -p 5000:5100 background-remover-app
```
4. Deploy on Kubernetes
Apply the Kubernetes deployment and service configurations:

```
kubectl apply -f kubernetes/deployment.yaml
kubectl apply -f kubernetes/service.yaml
```
5. Set Up AWS Infrastructure
Navigate to the terraform directory and initialize Terraform:

```
cd terraform
terraform init
terraform apply
```
This will set up the necessary AWS infrastructure, including an EKS cluster for running Kubernetes.

6. Set Up Jenkins Pipeline
Configure Jenkins with the provided ``` JenkinsPipelineScript.sh``` for automated CI/CD.
Ensure Jenkins has access to your Kubernetes cluster and AWS.
📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

🤝 Contributing
Contributions are welcome! Feel free to submit a Pull Request or open an Issue if you have suggestions or find any bugs.

📧 Contact
Developed with ❤️ by Aniket Purohit.
Reach out to me on (https://shorturl.at/cC2WI) or aniket2026.purohit@meu.edu.in.
