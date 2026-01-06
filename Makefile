.PHONY: up
up:
	docker compose up -d

.PHONY: down
down:
	docker compose down

.PHONY: restart
restart: down up

.PHONY: logs
logs:
	docker compose logs -f postgres

.PHONY: ingest-sync-members
ingest-sync-members:
	bun run 
