pipeline{

    agent any 

    stages{

        stage("Cloning"){
            step{ sh 'echo cloning repo' }
        }

        stage("Test"){
            step{ sh 'echo testing code'}
        }

        stage("Building"){
            steps{ sh 'echo building ' }
        }

        stage("Docker images uploade"){
            steps{sh 'echo dockerhub image upload'}
        }

        stage("deploy"){
            steps {sh 'echo we are live now'}
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