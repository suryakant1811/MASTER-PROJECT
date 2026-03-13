pipeline {

    agent any

    environment {
        SONAR_HOST_URL = 'http://65.0.99.17:9000'
        SONAR_TOKEN    = credentials('token')
    }

    stages {

        stage("Checkout Code") {
            steps {
                git branch: 'main', url: 'https://github.com/suryakant1811/MASTER-PROJECT.git'
            }
        }

        stage("SonarQube Analysis") {
            steps {
                echo "Running SonarQube Scan..."
                sh '''
                sonar-scanner \
                -Dsonar.projectKey=test \
                -Dsonar.projectName=test \
                -Dsonar.projectVersion=1.0 \
                -Dsonar.sources=app/backend,app/frontend \
                -Dsonar.host.url=$SONAR_HOST_URL \
                -Dsonar.token=$SONAR_TOKEN
                '''
            }
        }

        stage("Build Docker Images") {
            steps {
                dir('app/backend') {
                    sh "docker build -t suryasuraj/server:${BUILD_NUMBER} ."
                }

                dir('app/frontend') {
                    sh "docker build -t suryasuraj/client:${BUILD_NUMBER} ."
                }
            }
        }

        stage("Trivy Scan") {
            steps {
                sh '''
                trivy image --exit-code 0 --severity HIGH,CRITICAL suryasuraj/server:${BUILD_NUMBER}
                trivy image --exit-code 0 --severity HIGH,CRITICAL suryasuraj/client:${BUILD_NUMBER}
                '''
            }
        }

        stage("Push Images to DockerHub") {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub_cred',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {

                    sh '''
                    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin

                    docker push suryasuraj/server:${BUILD_NUMBER}
                    docker push suryasuraj/client:${BUILD_NUMBER}
                    '''
                }
            }
        }

        stage("Deploy to Kubernetes") {
            steps {
                sh '''
                kubectl set image deployment/backend-deployment backend=suryasuraj/server:${BUILD_NUMBER} -n default
                kubectl set image deployment/frontend-deployment frontend=suryasuraj/client:${BUILD_NUMBER} -n default

                kubectl rollout status deployment/backend-deployment -n default
                kubectl rollout status deployment/frontend-deployment -n default
                '''
            }
        }
    }

    post {

        success {
            emailext(
                subject: "✅ Pipeline SUCCESS - Build #${BUILD_NUMBER}",
                body: "Build #${BUILD_NUMBER} completed successfully.",
                to: "surajdwivedi644@gmail.com"
            )
        }

        failure {
            emailext(
                subject: "❌ Pipeline FAILED - Build #${BUILD_NUMBER}",
                body: "Build #${BUILD_NUMBER} FAILED. Check Jenkins logs.",
                to: "surajdwivedi644@gmail.com"
            )
        }

    }
}

// ==================================================================================================  Extended email jenkins


// SMTP server: smtp.gmail.com
// SMTP Port: 587
// Use SMTP Authentication: ✔
// Username: yourgmail@gmail.com     //google app password
// Password: Gmail App Password
// Use TLS: ✔


// ====================================================================================================  docker


// sudo apt install docker.io -y
// sudo usermod -aG docker jenkins
// sudo newgrp docker 
// sudo systemctl restart docker

// ==================================================================================================== trivy

// sudo apt install -y wget apt-transport-https gnupg lsb-release
// wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | sudo gpg --dearmor -o /usr/share/keyrings/trivy-archive-keyring.gpg
// echo "deb [signed-by=/usr/share/keyrings/trivy-archive-keyring.gpg] https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/trivy.list
// sudo apt update
// sudo apt install trivy -y

// ==================================================================================================== sonarqube

// sudo apt update
// sudo apt install openjdk-17-jdk -y
// sudo apt install unzip wget -y
// cd /opt
// sudo wget https://binaries.sonarsource.com/Distribution/sonarqube/sonarqube-10.3.0.82913.zip
// sudo unzip sonarqube-10.3.0.82913.zip
// sudo mv sonarqube-10.3.0.82913 sonarqube
// to start first create a new user for sonarqube to run 
// sudo adduser  sonaradmin
// sudo chown -R sonaradmin:sonaradmin /opt/sonarqube
// sudo su - sonaradmin
// cd /opt/sonarqube/bin/linux-x86-64
// sudo ./sonar.sh start
// ls /opt ->  sonarqube

// cd /opt
// sudo wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-5.0.1.3006-linux.zip
// sudo unzip sonar-scanner-cli-5.0.1.3006-linux.zip
// sudo mv sonar-scanner-5.0.1.3006-linux sonar-scanner

// echo 'export PATH=$PATH:/opt/sonar-scanner/bin' >> ~/.bashrc
// source ~/.bashrc
// sonar-scanner --version
