# Docker Compose commands
DC = docker compose

# Colors for pretty output
GREEN = \033[0;32m
RED = \033[0;31m
BLUE = \033[0;34m
NC = \033[0m # No Color

# Default target
all: up

# Start containers in detached mode
up:
	@echo "$(GREEN)Starting containers...$(NC)"
	@$(DC) up --build -d
	@echo "$(GREEN)Containers are up and running!$(NC)"

# Start containers with logs
up-log:
	@echo "$(GREEN)Starting containers with logs...$(NC)"
	@$(DC) up --build

# Stop containers
down:
	@echo "$(RED)Stopping containers...$(NC)"
	@$(DC) down
	@echo "$(RED)Containers stopped$(NC)"

# Remove containers and networks
clean: down
	@echo "$(RED)Removing containers and networks...$(NC)"
	@$(DC) rm -f
	@echo "$(RED)Cleanup complete$(NC)"

# Remove everything including volumes (WARNING: This will delete all data)
fclean: clean
	@echo "$(RED)WARNING: This will delete all data including volumes!$(NC)"
	@echo "$(RED)You have 5 seconds to cancel (Ctrl+C)...$(NC)"
	@sleep 5
	@echo "$(RED)Removing volumes...$(NC)"
	@$(DC) down -v
	@echo "$(RED)Full cleanup complete$(NC)"

# Rebuild containers
re: fclean up

# Show container status
status:
	@echo "$(BLUE)Container Status:$(NC)"
	@$(DC) ps

# Show logs
logs:
	@echo "$(BLUE)Container Logs:$(NC)"
	@$(DC) logs

# Show logs with follow
logs-f:
	@echo "$(BLUE)Following Container Logs:$(NC)"
	@$(DC) logs -f

.PHONY: all up up-log down clean fclean re status logs logs-f