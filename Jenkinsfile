pipeline {

    agent any

    environment {
        SONAR_HOST_URL = 'http://13.232.134.53:9000'
        SONAR_TOKEN    = credentials('token')
        SONAR_SCANNER  = '/var/lib/jenkins/workspace/project/sonar-scanner/lib/sonar-scanner-cli-4.8.0.2856.jar'
        JAVA_HOME      = '/usr/lib/jvm/java-17-openjdk-amd64'
    }

    stages {

        stage("SonarQube Analysis") {
            steps {
                echo "Running SonarQube scan for backend + frontend..."
                sh '''
                    ${JAVA_HOME}/bin/java -jar ${SONAR_SCANNER} \
                    -Dsonar.projectKey=test \
                    -Dsonar.projectName="test" \
                    -Dsonar.projectVersion=1.0 \
                    -Dsonar.sources=app/backend,app/frontend \
                    -Dsonar.host.url=${SONAR_HOST_URL} \
                    -Dsonar.token=${SONAR_TOKEN}
                '''
            }
        }

        stage("Build & Push Docker Images") {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub_cred',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"

                    dir('app/backend') {
                        sh "docker build -t suryasuraj/server:${BUILD_NUMBER} ."
                        sh "docker push suryasuraj/server:${BUILD_NUMBER}"
                    }
                    dir('app/frontend') {
                        sh "docker build -t suryasuraj/client:${BUILD_NUMBER} ."
                        sh "docker push suryasuraj/client:${BUILD_NUMBER}"
                    }
                }
            }
        }

        stage("Trivy Scan") {
            steps {
                sh "trivy image --exit-code 0 --severity HIGH,CRITICAL suryasuraj/server:${BUILD_NUMBER}"
                sh "trivy image --exit-code 0 --severity HIGH,CRITICAL suryasuraj/client:${BUILD_NUMBER}"
            }
        }

    // --exit-code 0 -> info but not stop not showing error
    // --exit-code 1 -> info and stop shaowinf error 

        stage("Deploy to Kubernetes") {
            steps {
                sh """
                    kubectl set image deployment/backend-deployment backend=suryasuraj/server:${BUILD_NUMBER} -n default
                    kubectl set image deployment/frontend-deployment frontend=suryasuraj/client:${BUILD_NUMBER} -n default
                    kubectl rollout status deployment/backend-deployment -n default
                    kubectl rollout status deployment/frontend-deployment -n default
                """
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

//  Pull latest LTS (Long-Term Support) version
// docker pull sonarqube:9.9-community

//  Run SonarQube
// docker run -d --name sonarqube \
//   -p 9000:9000 \
//   -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true \
//   sonarqube:9.9-community

// install scanner inside ci using url of instance and token to run the scaaner 

// docker run --rm \
//   -e SONAR_HOST_URL="http://13.235.79.139:9000" \
//   -e SONAR_LOGIN="squ_d9f03b7451f13fff9b4449732ec12b1121b1e357" \
//   -v $(pwd):/usr/src \
//   sonarsource/sonar-scanner-cli


//sonar qube needed to implemet 