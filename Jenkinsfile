pipeline{
    agent any
    environment{
        GITHUB_REPO = 'https://github.com/aad/django-react-kubernetes-project.git'
    }
    stages{
        stage('Checkout Code'){ 
            steps{
                git branch: 'feature/ci-cd-with-minikube', 
                    url: env.GITHUB_REPO
            }
        }

        stage('Build'){
            steps{
                echo 'Building'
            }
        }
        stage('Test'){
            steps{
                echo 'Testing'
            }
        }
        stage('Deploy'){
            steps{
                echo 'Deploying'
            }
        }
    }
}