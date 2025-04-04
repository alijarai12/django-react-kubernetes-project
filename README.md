# Full-Stack Expense Tracking App with Kubernetes

## Introduction
This is a simple CRUD application that helps us track our expenses. The app is built using **React** for the frontend, **Django REST Framework** (DRF) for the backend, and **PostgreSQL** as the database. The entire stack is deployed using **Kubernetes** for scalability and management.

---

## Technologies Used
- **Frontend**: React.js
- **Backend**: Django Rest Framework
- **Database**: PostgreSQL
- **Database Administration**: pgAdmin
- **Containerization**: Docker
- **Orchestration**: Kubernetes
- **Deployment**: Minikube (local Kubernetes cluster)

### 1. **Clone the repository**
   Clone the repository to your local machine:
    ```bash
    git git@github.com:alijarai12/django-react-kubernetes-project.git
    cd django-react-kubernetes-project

## 2. **Backend Setup - Django REST Framework**

### 2.1. **Django Configuration**

The **Django REST Framework** (DRF) is used for the backend, which interacts with the **PostgreSQL** database. The database connection and other settings are configured in the `settings.py` file.
        ```python
        DATABASES = {
            "default": {
                "ENGINE": "django.db.backends.postgresql",
                "NAME": environ.get("PSQL_NAME"),
                "USER": environ.get("PSQL_USER"),
                "PASSWORD": environ.get("PSQL_PASSWORD"),
                "HOST": environ.get("PSQL_SERVICE"),
                "PORT": environ.get("PSQL_PORT"),
            }
        }

        CSRF_TRUSTED_ORIGINS = [
            "http://localhost:8000",
            "http://api.exptrackapp.local",
        ]

        CORS_ALLOWED_ORIGINS = [
            "http://localhost:5173",
            "http://app.exptrackapp.local",
            "http://api.exptrackapp.local",
        ]

        ALLOWED_HOSTS = ["localhost", "api.exptrackapp.local"]

### 2.2. **Kubernetes ConfigMap and Secret for Backend**
In the Kubernetes setup, the ConfigMap and Secret hold sensitive data like database credentials and environment variables for the backend.
- ConfigMap (backend):
        ```yaml
        apiVersion: v1
        kind: ConfigMap
        metadata:
        name: configmap
        namespace: exp
        data:
        PSQL_NAME: "devops_db"
        PSQL_SERVICE: "postgres-service"
        PSQL_PORT: "5432"

- Secret (backend):
        ```yaml
        apiVersion: v1
        kind: Secret
        metadata:
        name: secrets
        namespace: exp
        data:
        POSTGRES_USER: dGVzdHVzZXI=  # base64-encoded username
        POSTGRES_PASSWORD: dGVzdHVzZXI=  # base64-encoded password
        PSQL_USER: dGVzdHVzZXI=
        PSQL_PASSWORD: dGVzdHVzZXI=

### 2.3. **Backend Ingress Setup**
The Ingress ensures that the backend service is accessible via a specified hostname.
        ```yaml
        apiVersion: networking.k8s.io/v1
        kind: Ingress
        metadata:
        name: backend-ingress
        namespace: exp
        spec:
        rules:
        - host: api.exptrackapp.local
            http:
            paths:
            - pathType: Prefix
                path: "/"
                backend:
                service:
                    name: backend
                    port:
                    number: 8000
