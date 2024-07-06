# Books Management System

## Description

This is a simple books management system that allows users to get, add, delete and update books. The system is
implemented
using Django and Angular frameworks. Code splitted into two folders, one for the backend and the other for the frontend.

__Please Note:__ As a backend developer, I have more experience in Django than in Angular. So, the frontend part may not
be perfect in all aspects.

## How to run the system

### Using Docker

1. Clone the repository
2. Make sure Docker is installed and running on your machine
3. Run the following command to build project
    ```bash
    docker-compose build
    ```
4. Run the following command to run the project
    ```bash
    docker-compose up
    ```
5. Open your browser and navigate to `http://localhost:4200/` to access the system

### Without Docker

__Note:__ It's highly recommended to use Docker to run the project.

1. Clone the repository
2. Make sure Python 3.9+ and Node.js are installed on your machine
3. Create a virtual environment and activate it

    - For Linux
        ```bash
        python -m venv venv
        source venv/bin/activate.sh
        ```
    - For Windows
        ```bash
        python -m venv venv
        venv\Scripts\activate.bat
        ```

4. Navigate to the backend folder and run the following commands
    ```bash
    pip install -r requirements.txt
    python manage.py migrate
    python manage.py runserver
    ```
   *After this step, you already can access the backend API using the following URL: `http://localhost:8000/swagger`*


5. Navigate to the frontend folder and run the following commands
    ```bash
    npm install
    ng serve
    ```
6. Open your browser and navigate to `http://localhost:4200/` to access the system

### Useful Commands and URLs

1. Run backend tests using the following command
    ```bash
    docker-compose run backend python manage.py test
    ```

2. Swagger documentation for backend
    ```bash
    http://localhost:8000/swagger/
    ```
3. Plain docs for backend
    ```bash
    http://localhost:8000/docs/
    ```

### Project Stack

- Backend:
    - Python
    - Django
    - Django Rest Framework
    - Django Rest Framework Cors Headers
    - DRF YASG (Yet Another Swagger Generator)
    - SQLite
- Frontend:
    - Angular
    - Bootstrap 5