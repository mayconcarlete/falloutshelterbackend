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
>### GetThreeWordsController
![alt text](https://user-images.githubusercontent.com/6265325/114273921-835d5780-99f2-11eb-951c-a572f0144f00.png)
>### UpdateWordController
![alt text](https://user-images.githubusercontent.com/6265325/114584235-d46e8500-9c58-11eb-9dcf-dc696e4799c9.png)
>### DeleteWordController
![alt text](https://user-images.githubusercontent.com/6265325/114584238-d5071b80-9c58-11eb-8097-daf7e9c1d03d.png)


>## Start Application
* docker-compose up
* You can test the api opening swagger docs or calling each specific route
* localhost:3000/api-docs
* localhost:3000/delete-word/:word
* localhost:3000/get-three-words/:word
* localhost:3000/update-word/:word

>## Swagger
![alt text](https://user-images.githubusercontent.com/6265325/114895636-0d883000-9de6-11eb-9f00-f0306fb60951.png)

>## Test Driven Development is awesome!
* Coverage over all core system

![alt text](https://user-images.githubusercontent.com/6265325/114895532-f5b0ac00-9de5-11eb-97da-cd6e4cdeedd1.png)

>## Search algorithm used: Levenshtein

## Task Description
Your task for this challenge is to create a small search engine comprising of two parts, a web-based user interface and a server component that exposes a REST API which provides search results retrieved from a corpus of text that will be provided to you in `corpus/hemingway.txt`.

Your submission will be evaluated for conforming to the specifications outlined below as well as code quality (maintainability, scalability, performance etc.). You are permitted to use any resources and libraries you wish, however, you should be able to justify design choices in your code.


## Requirements
The basic search engine should be capable of the following three operations.

1. Given a query consisting of a single word, display the 3 most similar words in the search corpus according to some similarity metric of your choosing.
2. Given a single word `w`, update the search corpus with `w`. The new word `w` should immediately be 
queryable.
3. Given a single word `w`, remove the most similar word to `w` in the corpus from further search results. 
### User Interface
The user interface should be a browser-based application developed using your JavaScript web framework of choice. It should support the three aforementioned operations. How this is done is completely up to you. Use your creativity and imagination to create a UI that will set your submission apart!

### REST API
The REST API can be implemented using whatever language and frameworks of your choosing. Again, like the UI, it needs to support the three operations listed above. How you choose to accomplish this task is up to you.

## Deliverables
To submit your challenge, fork this repository and provide the link to your forked repository.
You should also update this README to include instructions on how to run your search engine.
Tests are not mandatory but will be considered bonus points if you provide them.




# Fallout Shelter Backend
## Summary
Welcome to the Fallout Shelter Underground Vault, where you act as the Overseer with the ability to:
 * Retrieve information regarding each dweller in the Vault
 * Allow dwellers to enter the Vault
 * Retrieve all information regarding a specific dweller by providing their user ID
 * Query the Vault for dwellers that match a specific search filter (i.e: haircolor, eyecolor, age, name)
 * Move time forward to retrieve a search result with dwellers and their updated ages 
 
