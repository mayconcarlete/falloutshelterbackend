unit-test:
	@docker-compose -f docker-compose-dev.yml run unit-test

dev:
	@docker-compose -f docker-compose-dev.yml up run-local
