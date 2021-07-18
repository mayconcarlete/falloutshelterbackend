# Fallout Shelter Backend Challenge

> ## Principles:
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

> ## Design Patterns:
* Factory
* Decorator
* Adapter
* Dependency Injection 

>## Methodology and Design:
* TDD
* Conventional Commits
* Modular Design

>## Top Level Architecture Design
>### Add Vault Controller
![alt text](https://user-images.githubusercontent.com/6265325/126053658-87721218-9b6a-48b0-912e-47e9d680904d.png)
>### Get Vault By Id Controller
![alt text](https://user-images.githubusercontent.com/6265325/126053671-f24aed54-b8e5-4829-8d61-521da7ef23b6.png)
>### Query Vault Controller
![alt text](https://user-images.githubusercontent.com/6265325/126053683-976ebfab-57cc-4d81-979f-6d1475bcd308.png)
>### Move Time Controller
![alt text](https://user-images.githubusercontent.com/6265325/126053696-1019c9d2-ef7c-4fee-a74f-5e6e3405779e.png)


>## Start Application
* docker-compose up
* You can test the api opening swagger docs or calling each specific route
* localhost:3000/api-docs
* localhost:3000/delete-word/:word
* localhost:3000/get-three-words/:word
* localhost:3000/update-word/:word

>## Swagger
![alt text](https://user-images.githubusercontent.com/6265325/126053768-39999bea-f999-4f63-a582-b6f84c944dbf.png)

>## Test Driven Development is awesome!
* Coverage over all core system

![alt text](https://user-images.githubusercontent.com/6265325/126053822-988d9d82-183f-4358-b02c-11e89608152e.png)


## Summary
Welcome to the Fallout Shelter Underground Vault, where you act as the Overseer with the ability to:
 * Retrieve information regarding each dweller in the Vault
 * Allow dwellers to enter the Vault
 * Retrieve all information regarding a specific dweller by providing their user ID
 * Query the Vault for dwellers that match a specific search filter (i.e: haircolor, eyecolor, age, name)
 * Move time forward to retrieve a search result with dwellers and their updated ages 
 
Please follow along to setup the environment and run the application. 
 
