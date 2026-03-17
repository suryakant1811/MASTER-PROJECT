resource "aws_instance" "pub_server_1" {
    ami = "ami-0b6c6ebed2801a5cb"
    instance_type = "t3.micro"
    vpc_security_group_ids = [
        aws_security_group.project_sg.id
    ]
    subnet_id = aws_subnet.public_subnet_1.id
    key_name = "terra_key_east_1"

    tags = {
        Name = "bastion_host"
    }
}


resource "aws_instance" "pvt_subnet_1" {
    ami = "ami-0b6c6ebed2801a5cb"
    instance_type = "t3.micro"
    key_name = "terra_key_east_1"
    vpc_security_group_ids = [aws_security_group.project_sg.id]
    subnet_id = aws_subnet.private_subnet_1.id
    associate_public_ip_address = false 
    tags = {
        Name = "private_server"
    }
}