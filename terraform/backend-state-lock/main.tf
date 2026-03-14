resource "aws_s3_bucket" "s3_bucket" {
    bucket = "surya_s3_bucket_backend_MASTER_APP"
}

resource "aws_s3_bucket_versioning" "s3_versioning" {
    bucket = aws_s3_bucket.s3_bucket.id
    versioning_configuration {
    status = "Enable"
  }
}

resource "aws_s3_bucket_acl" "s3_acl" {
    bucket = aws_s3_bucket.s3_bucket.id
    acl = "private"
}

resource "aws_dynamodb_table" "dynodb" {
    name = "terraform-local-table"
    billing_mode = "PAY_PER_REQUEST"
    hash_key = "LockID"

    attribute {
    name = "LockID"
    type = "S"
  }

}

terraform {
  backend "s3" {
    bucket = "surya_s3_bucket_backend_MASTER_APP"
    key = "prod/terraform.tfstate"
    region = "us-east-1"
    dynamodb_table = "terraform-local-table"
  }
}