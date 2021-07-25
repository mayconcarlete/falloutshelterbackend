# Fallout Shelter Backend Challenge

## Principles:
* SRP - Single Responsability Principle
* OCP - Open Closed Principle
* LSP - Liskov Substitution Principle
* ISP - Interface Segregation Principle
* DIP - Dependency Inversion Principle
* SOC - Separation of Concerns
* DRY - Don't Repeat Yourself
* KISS - Keep It Simple, Silly
* Composition Over Inheritance
* Small Commits

## Design Patterns:
* Factory
* Decorator
* Adapter
* Dependency Injection 

## Methodology and Design:
* TDD
* Conventional Commits
* Modular Design

## Top Level Architecture Design
### Add Dweller Controller
![alt text](https://user-images.githubusercontent.com/6265325/126898107-5791b1a4-e602-4aaf-8187-4a667ceb6647.png)
### Get Dweller By Id Controller
![alt text](https://user-images.githubusercontent.com/6265325/126898109-818f6b76-b145-4d05-ae9b-92a74e102dfa.png)
### Query Dweller Controller
![alt text](https://user-images.githubusercontent.com/6265325/126898110-1dcf2dbb-c70a-412e-9808-b67a86d6fcd9.png)
### Move Time Controller
![alt text](https://user-images.githubusercontent.com/6265325/126898111-39936b4b-ae2e-46e8-a229-f772dc4c7191.png)

## Swagger Support
![alt text](https://user-images.githubusercontent.com/6265325/126898416-c34b9ec2-08a7-4bf2-bf67-d821a8136513.png)

## Test Driven Development is awesome!
* Coverage over all core system

![alt text](https://user-images.githubusercontent.com/6265325/126898330-a0a75873-dfcf-4172-8e3e-bcc45a201fca.png)

## CI/CD
 * Circle/CI
 * Deploy image to Docker Hub
![alt text](https://user-images.githubusercontent.com/6265325/126898882-017f5568-a409-4343-a939-d88f8fc45812.png)

## Why use decorator to handle with move time and how its works
 
 Without this decorator, every time that we want to set a new time with move-time route, we would need to update all rows/keys in our database, this could be very costly over time as data grows. So with this decorator we handle with this issue by make just a request to a saved date in out database and  make the difference between dweller and date, avoiding update all rows/keys everytime that we want to set a new time.</br>

![alt text](https://user-images.githubusercontent.com/6265325/126900773-b0f5bb3f-26b4-4256-9373-6a01e7d1a6ee.png)

## Summary
Welcome to the Fallout Shelter Underground Vault, where you act as the Overseer with the ability to:
 * Retrieve information regarding each dweller in the Vault
 * Allow dwellers to enter the Vault
 * Retrieve all information regarding a specific dweller by providing their user ID
 * Query the Vault for dwellers that match a specific search filter (i.e: haircolor, eyecolor, age, name)
 * Move time forward to retrieve a search result with dwellers and their updated ages 
 
Please follow along to setup the environment and run the application. 

## Start Application
 * Make sure to have docker and Makefile installed
 * Rename **".env.example"** file to **.env**
 * To run tests: **make unit-test**
 * To run api in development mode: **make dev**
 * You can test the api opening swagger docs or calling each specific route
 * localhost:3000/api-docs
 * localhost:3000/add-dweller - POST
 * localhost:3000/get-dweller-by-id/:id - GET
 * localhost:3000/query-dweller - POST
 * localhost:3000/move-time - POST

## To-Do
 * Migrate database to DynamoDb - in progress
 * Migrate image deploy to ECR
