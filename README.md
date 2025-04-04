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

---

### 1. **Clone the repository**
Clone the repository to your local machine:
    ```bash
    git clone git@github.com:alijarai12/django-react-kubernetes-project.git
    cd django-react-kubernetes-project

---


## 2. **Backend Setup - Django REST Framework**

### 2.1. **Django Configuration**

The **Django REST Framework** (DRF) is used for the backend, which interacts with the **PostgreSQL** database. The database connection and other settings are configured in the `settings.py` file.
    ```ini
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

### 2.2. **Kubernetes ConfigMap and Secret for Backend**
In the Kubernetes setup, the ConfigMap and Secret hold sensitive data like database credentials and environment variables for the backend.
- ConfigMap (backend):
    ``ini
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

- Secret (backend):
    ```ini
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
### 2.3. **Backend Ingress Setup**
The Ingress ensures that the backend service is accessible via a specified hostname.
    ```ini
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

---


## 3. **Frontend Setup - React (Vite)**
The frontend is built using **React** and **Vite** as the build tool. Kubernetes handles the orchestration of the frontend service, while the Vite development server is configured to work with a local API hosted via the backend service.

### 3.1. **Frontend Configuration**
The frontend uses **Vite** to bundle and serve the application. Below is the relevant configuration for Vite in `vite.config.ts`:
    ```ini
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'

    export default defineConfig({
    plugins: [react()],
    server: {
        host: '0.0.0.0',    
        port: 5173,
        strictPort: true,   
        hmr: {
        host: "app.exptrackapp.local",
        },
        allowedHosts: ["app.exptrackapp.local"],
    }
    })

Key points:

- The Vite development server is bound to 0.0.0.0 and runs on port 5173.

- Hot Module Replacement (HMR) is configured to work with app.exptrackapp.local.

- The allowedHosts configuration ensures only specific domains (like app.exptrackapp.local) can access the development server.

### 3.2. ** Frontend Environment Configuration (.env)**
To connect to the backend API, the frontend uses an environment variable defined in the .env file:
    ```ini
    VITE_API_URL=http://api.exptrackapp.local/api


### 3.3. ** Kubernetes ConfigMap for Frontend**
    
    ```ini
    apiVersion: v1
    kind: ConfigMap
    metadata:
    name: frontend-config
    namespace: exp
    data:
    VITE_API_URL: "http://api.exptrackapp.local/api"


### 3.4. ** Kubernetes Ingress for Frontend**
The frontend service is exposed to the outside world via an Ingress configuration in Kubernetes. The Ingress routes traffic from app.exptrackapp.local to the frontend service on port 5173:
    
    ```ini
    apiVersion: networking.k8s.io/v1
    kind: Ingress
    metadata:
    name: frontend-ingress
    namespace: exp
    spec:
    rules:
    - host: app.exptrackapp.local
        http:
        paths:
        - pathType: Prefix
            path: "/"
            backend:
            service:
                name: frontend
                port:
                number: 5173  # Must match the service port

### 3.5. ** Kubernetes Ingress for Frontend**

    ```ini
    apiVersion: v1
    kind: Service
    metadata:
    name: frontend
    namespace: exp
    spec:
    ports:
    - port: 5173
        targetPort: 5173
    selector:
        app: frontend

### 3.5. ** Kubernetes Ingress for Frontend**
Once the frontend is deployed via Kubernetes, you can access the application at http://app.exptrackapp.local (this assumes that you have configured DNS or hosts file entries to resolve app.exptrackapp.local to the appropriate Minikube IP or Kubernetes cluster IP).

You can view the frontend service and its status by running:
    ```ini
    kubectl get services -n exp

You can check the ingress routes with:
    ```ini
    kubectl get ingress -n exp



---
