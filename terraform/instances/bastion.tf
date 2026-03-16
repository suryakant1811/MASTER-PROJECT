resource "aws_instance" "name" {
    ami = ami-0b6c6ebed2801a5cb
    instance_type = "t3.micro"
    vpc_security_group_ids = {
        aws_security_group.project_sg.id
    }
    subnet_id = aws_subnet.public_subnet_1.id
    security_groups = aws_security_group.project_sg.id
    
    key_name = "terra_key_east_1.pem"

    tags = {
    Name = "bastion_host"
    }


}