unit-test:
	@docker-compose -f docker-compose-dev.yml run unit-test

dev:
	@docker-compose -f docker-compose-dev.yml up nginx

api: 
	@docker-compose up nginx

rebuild:
	@docker-compose up -d --no-deps --build api

clean-container:
	@docker rm -vf $(shell docker ps -a -q)

clean-images:
	@docker rmi -f $(shell docker images -a -q)