# Communication between Microservices with RabbitMQ

This web application is a simple application to manage a list of books.

## Infrastructure

This applications consists of three parts:

1. Frontend: Single Page Application built with: React and tailwindcss.
2. Createbook: HTTP REST API built with Node.js, Express and MongoDB.
3. Listbook: HTTP REST API built with Node.js, Express and MongoDB.

## How to run

to start the application use docker compose:

`docker-compose up --build`

once the app is running you can open:

http://localhost:3000

on your browser.
