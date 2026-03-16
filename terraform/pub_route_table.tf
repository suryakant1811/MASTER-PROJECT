resource "aws_route_table" "pub_rt" {
    vpc_id = aws_vpc.vpc.id
    route {
        cidr_block = "0.0.0.0/0"
        gateway_id = aws_internet_gateway.ig.id
    }
    tags = {
      Name = "public_route_table"
    }
}

resource "aws_route_table_association" "public_assocaition_1" {
    route_table_id = aws_route_table.pub_rt.id
    subnet_id = aws_subnet.public_subnet_1.id
}
resource "aws_route_table_association" "public_assocaition_2" {
    route_table_id = aws_route_table.pub_rt.id
    subnet_id = aws_subnet.public_subnet_2.id
}