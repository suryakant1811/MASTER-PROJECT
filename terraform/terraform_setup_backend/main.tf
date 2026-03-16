resource "aws_s3_bucket" "s3_bucket" {
    bucket = "surya-s3-bucket-backend-master-app"
}

resource "aws_s3_bucket_versioning" "s3_versioning" {
    bucket = aws_s3_bucket.s3_bucket.id
    versioning_configuration {
    status = "Enabled"
  }
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