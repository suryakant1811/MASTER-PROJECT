// pipeline{

//     agent any 

//     environment {
//     SONAR_HOST = credentials('host')  
//     SONAR_TOKEN = credentials('token')   
// }

//     stages{

//         stage("Cloning"){
//             steps{ 
//                 echo "Cloning Repo..."
//                 git branch: 'main', url: 'https://github.com/suryakant1811/MASTER-PROJECT.git'
//                 }
//         }

//         stage("Testing backend using sonarqube"){
//             steps{
//                 echo "Running SonarQube scan for backend..."
//                 dir('app/backend'){
//                     sh ''' 
//                         docker run --rm \
//                         -e SONAR_HOST_URL="http://15.206.128.4:9000/" \
//                         -e SONAR_LOGIN="${SONAR_TOKEN}" \
//                         -v \$(pwd):/usr/src \
//                         sonarsource/sonar-scanner-cli \
//                         -Dsonar.projectKey=backend \
//                         -Dsonar.sources=.
//                     ''' 
//                 }
//             }
//         }

        

//         stage("Testing frontend using sonarqube"){
//             steps{
//                 echo "Running SonarQube for frontend..."
//                 dir('app/frontend'){
//                     sh ''' 
//                         docker run --rm \
//                         -e SONAR_HOST_URL="http://15.206.128.4:9000/" \
//                         -e SONAR_LOGIN="${SONAR_TOKEN}" \
//                         -v \$(pwd):/usr/src \
//                         sonarsource/sonar-scanner-cli \
//                         -Dsonar.projectKey=frontend \
//                         -Dsonar.sources=.
//                     '''
//                 }
//             }
//         }

//         stage("Building and pushing Docker imgage"){
//             steps{
//                 echo "Building and pushing backend images"
//                 dir('app/backend'){
//                     sh " docker build -t suryasuraj/server:${BUILD_NUMBER} ."
//                     sh " docker push suryasuraj/server:${BUILD_NUMBER} "
//                 }
//                 echo "Building and pushing frontend images"
//                 dir('app/frontend'){
//                     sh " docker build -t suryasuraj/client:${BUILD_NUMBER} ."
//                     sh " docker push suryasuraj/client:${BUILD_NUMBER} "
//                 }
//             }
//         }

//         stage("Trivy scan"){
//             steps{
//                 echo "scanning backend image..."
//                 sh "trivy image --exit-code 1 --severity HIGH,CRITICAL suryasuraj/server:${BUILD_NUMBER}"
//                 echo "scanning frontend image..."
//                 sh "trivy image --exit-code 1 --severity HIGH,CRITICAL suryasuraj/client:${BUILD_NUMBER}"
//             }
//         }

//          stage('Deploy to Kubernetes') {
//             steps {
//                 echo "Deploying backend and frontend to Kubernetes..."
//                 dir('kubernetes') {
//                     sh """
//                     kubectl set image deployment/backend-deployment backend=suryasuraj/server:${BUILD_NUMBER} -n default --record
//                     kubectl set image deployment/frontend-deployment frontend=suryasuraj/frontend:${BUILD_NUMBER} -n default --record
//                     kubectl rollout status deployment/backend-deployment -n default
//                     kubectl rollout status deployment/frontend-deployment -n default
//                     """
//                 }
//             }
//         }

//     }

//    post {

//         success {
//             emailext(
//                 subject: "Pipeline Success",
//                 body: "Pipeline build SUCCESS",
//                 to: "surajdwivedi644@gmail.com"
//             )
//         }

//         failure {
//             emailext(
//                 subject: "Pipeline Failed",
//                 body: "Pipeline build FAILED",
//                 to: "surajdwivedi644@gmail.com"
//             )
//         }

//     }
// }


pipeline {
    agent any

    environment {
        SONAR_HOST = credentials('host')   // SonarQube server URL
        SONAR_TOKEN = credentials('token') // SonarQube token
        JAVA_PATH = "/usr/lib/jvm/java-17-openjdk-amd64/bin/java"
    }

    stages {

        stage("Use Sonar Credentials") {
    steps {
        withCredentials([
            string(credentialsId: 'sonar-token', variable: 'SONAR_TOKEN')
        ]) {
            sh '''
            echo "Using Sonar Host: $SONAR_HOST"
            echo "Token length check:"
            echo ${#SONAR_TOKEN}
            '''
        }
    }
}

        // stage("Cloning") {
        //     steps {
        //         echo "**************************************************************************************"
        //         echo "${SONAR_TOKEN} "
        //         echo "${SONAR_HOST} "
        //         echo "**************************************************************************************"
        //         // git branch: 'main', url: 'https://github.com/suryakant1811/MASTER-PROJECT.git'
        //     }
        // }

//         stage("Download SonarScanner") {
//             steps {
//                 echo "Downloading SonarScanner..."
//                 dir("${WORKSPACE}") {
//                     sh '''
//                     if [ ! -d sonar-scanner ]; then
//                         wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.8.0.2856-linux.zip
//                         unzip sonar-scanner-cli-4.8.0.2856-linux.zip
//                         mv sonar-scanner-4.8.0.2856-linux sonar-scanner
//                     fi
//                     '''
//                 }
//             }
//         }

//         stage("SonarQube Scan") {
//           steps {
//         echo "Running SonarQube scan..."
//         sh '''

//             /usr/lib/jvm/java-17-openjdk-amd64/bin/java -jar \
//   ~/MASTER-PROJECT/sonar-scanner-4.8.0.2856-linux/lib/sonar-scanner-cli-4.8.0.2856.jar \
//   -Dsonar.projectKey=test \
//   -Dsonar.projectName="test" \
//   -Dsonar.projectVersion=1.0 \
//   -Dsonar.sources=app/backend,app/frontend \
//   -Dsonar.host.url=http://13.232.134.53:9000 \
//   -Dsonar.token=squ_02bf5374e4765ed64b20f73fa862d7af7d992903
//             '''
//     }
// }

        // stage("Build and Push Docker Images") {
        //     steps {
        //         echo "Building backend image..."
        //         dir('app/backend') {
        //             sh "docker build -t suryasuraj/server:${BUILD_NUMBER} ."
        //             sh "docker push suryasuraj/server:${BUILD_NUMBER}"
        //         }

        //         echo "Building frontend image..."
        //         dir('app/frontend') {
        //             sh "docker build -t suryasuraj/client:${BUILD_NUMBER} ."
        //             sh "docker push suryasuraj/client:${BUILD_NUMBER}"
        //         }
        //     }
        // }

        // stage("Trivy Scan") {
        //     steps {
        //         echo "Scanning backend image..."
        //         sh "trivy image --exit-code 1 --severity HIGH,CRITICAL suryasuraj/server:${BUILD_NUMBER}"

        //         echo "Scanning frontend image..."
        //         sh "trivy image --exit-code 1 --severity HIGH,CRITICAL suryasuraj/client:${BUILD_NUMBER}"
        //     }
        // }

        // stage("Deploy to Kubernetes") {
        //     steps {
        //         echo "Deploying backend and frontend to Kubernetes..."
        //         dir('kubernetes') {
        //             sh """
        //             kubectl set image deployment/backend-deployment backend=suryasuraj/server:${BUILD_NUMBER} -n default --record
        //             kubectl set image deployment/frontend-deployment frontend=suryasuraj/client:${BUILD_NUMBER} -n default --record
        //             kubectl rollout status deployment/backend-deployment -n default
        //             kubectl rollout status deployment/frontend-deployment -n default
        //             """
        //         }
        //     }
        // }

    }

    // post {
    //     success {
    //         emailext(
    //             subject: "Pipeline Success",
    //             body: "Pipeline build SUCCESS",
    //             to: "surajdwivedi644@gmail.com"
    //         )
    //     }
    //     failure {
    //         emailext(
    //             subject: "Pipeline Failed",
    //             body: "Pipeline build FAILED",
    //             to: "surajdwivedi644@gmail.com"
    //         )
    //     }
    // }
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
//   -e SONAR_HOST_URL="http://13.232.134.53:9000/" \
//   -e SONAR_LOGIN="sqp_ff3553c43af5e5a85c693eb827bd8617e66b9bc2" \
//   -v $(pwd):/usr/src \
//   sonarsource/sonar-scanner-cli


//sonar qube needed to implemet 


// /usr/lib/jvm/java-17-openjdk-amd64/bin/java -jar \
//   ~/MASTER-PROJECT/sonar-scanner-4.8.0.2856-linux/lib/sonar-scanner-cli-4.8.0.2856.jar \
//   -Dsonar.projectKey=test \
//   -Dsonar.projectName="test" \
//   -Dsonar.projectVersion=1.0 \
//   -Dsonar.sources=app/backend,app/frontend \
//   -Dsonar.host.url=http://13.232.134.53:9000 \
//   -Dsonar.token=squ_02bf5374e4765ed64b20f73fa862d7af7d992903