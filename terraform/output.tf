output "bastion_public_ip" {
  value = aws_instance.pub_server_1.public_ip
}

output "private_instance_ip" {
  value = aws_instance.pvt_subnet_1.private_ip
}