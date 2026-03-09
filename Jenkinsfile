pipeline{

    agent any 

    stages{

        stage("Cloning"){
            steps{ 
                
             }
        }

        stage("Test"){
            steps{ sh 'echo testing code'}
        }

        stage("Building"){
            steps{ sh 'echo building ' }
        }

        stage("Docker images uploade"){
            steps{sh 'echo dockerhub image upload'}
        }

        stage("deploy"){
            steps {sh 'echo we are live now...'}
        }

    }

   post {

        success {
            emailext(
                subject: "Pipeline Success",
                body: "Pipeline build SUCCESS",
                to: "surajdwivedi644@gmail.com"
            )
        }

        failure {
            emailext(
                subject: "Pipeline Failed",
                body: "Pipeline build FAILED",
                to: "surajdwivedi644@gmail.com"
            )
        }

    }
}
 
// ====================================================================================================  docker


// sudo apt install docker.io -y
// sudo usermod -aG docker jenkins
// sudo systemctl restart docker

// ==================================================================================================== trivy

// sudo apt install wget apt-transport-https gnupg -y
// wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | sudo apt-key add -
// echo deb https://aquasecurity.github.io/trivy-repo/deb stable main | sudo tee /etc/apt/sources.list.d/trivy.list
// sudo apt update
// sudo apt install trivy -y

// ==================================================================================================== sonarqube

//  Pull latest LTS (Long-Term Support) version
// docker pull sonarqube:9.9-community

//  Run SonarQube
// docker run -d --name sonarqube \
//   -p 9000:9000 \
//   -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true \
//   sonarqube:9.9-community