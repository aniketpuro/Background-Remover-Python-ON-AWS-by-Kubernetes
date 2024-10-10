# Security Group for EC2 instance
resource "aws_security_group" "app_sg" {
  vpc_id = var.vpc_id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Allow HTTP traffic from anywhere
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Allow SSH access
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# EC2 Instance
resource "aws_instance" "app_server" {
  ami           = "ami-0c55b159cbfafe1f0"  # Amazon Linux 2 AMI ID
  instance_type = var.instance_type
  key_name      = var.key_name
  subnet_id     = var.subnet_id

  security_groups = [aws_security_group.app_sg.name]

  user_data = file("ec2_userdata.sh")  # EC2 User data to install Docker and run the app

  tags = {
    Name = "Flask Background Remover App"
  }
}

# Output public IP
output "app_public_ip" {
  value = aws_instance.app_server.public_ip
}

# Output instance ID
output "instance_id" {
  value = aws_instance.app_server.id
}
