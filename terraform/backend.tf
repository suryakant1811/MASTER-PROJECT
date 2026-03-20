terraform {
 backend "s3" {
   bucket = "surya-s3-bucket-backend-master-app-live"
    key = "prod/terraform.tfstate"
   region = "us-east-1"
   dynamodb_table = "terraform-local-table-live"
 }
 }
