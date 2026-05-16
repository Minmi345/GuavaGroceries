# Prerequisites

- Install docker-desktop (For window users, install wsl when prompted).
- docker-desktop needs to be started.

# Combined container
## Rebuild docker image
Do this after you

_1. install a new npm package_

_2. pull from main or any other branch_

_3. update .env file_

This will make sure docker image gets rebuilt with the updated `package.json` and environment variables
   
- Build and start (backend):

   ```bash
   docker compose up --build -d
   ```

## Quick Start

Run this to start the container:

```bash
docker compose up -d
```

Run this to stop the container:

```bash
docker compose down
```

## To generate docs and serve docs

Run this:

```bash
docker compose exec backend npm run docs
docker compose exec backend npm run docs:serve
```

View documentation at `http://localhost:4000`
Frontend will now use this url for fetching from backend.`http://backend:3000`.
docker compose exec commands are still the same as before.

***
***

# Individual containers
## Rebuild docker image (backend)
Do this after you

_1. install a new npm package_

_2. pull from main or any other branch_

This will make sure docker image gets rebuilt with the updated `package.json`
   
- Build and start (backend):
   ```bash
   cd backend
   docker compose up --build -d
   ```
- Build and start (frontend):
   ```bash
   cd frontend
   docker compose up --build -d
   ```

## Quick Start

### Backend

Run these two commands to start the backend container:

```bash
cd backend
docker compose up -d
```

The backend will be available at `http://localhost:3000`.

### Frontend
Run these two commands to start the frontend container:
```
cd frontend
docker compose up -d
```

The frontend will be available at `http://localhost:5173`.

### Run Both Together

From the project root:

```bash
docker compose -f backend/docker-compose.yml -f frontend/docker-compose.yml up -d
```
### Run npm commands

Usually we do, `npm <something>`. We just need to prefix npm commands with docker compose <container_name> with `docker compose exec` to run the same commands inside docker container. Backend container is called `backend` and frontend container is called `frontend`.
For example, to run frontend npm command:
```bash
docker compose exec frontend npm run dev
```

```
```
For backend npm command:
```bash
docker compose exec backend npm run dev
```

_That's all folks!_

***
***

## Optional information

### Commands

| Command | Description |
|---------|-------------|
| `docker compose exec <container-name> <command>` | run command in docker |
| `docker compose up --build` | Build and start (foreground) |
| `docker compose up --build -d` | Build and start (background, detached mode) |
| `docker compose up` | Start containers |
| `docker compose down` | Stop and remove containers |
| `docker compose logs -f` | Follow logs |

### Volume Mounts

Source directories are mounted into the containers for hot reload during development:

- **Backend**: `./src` → `/app/src`
- **Frontend**: `./src` → `/app/src`, `./public` → `/app/public`

Changes to files in these directories will be reflected live without rebuilding.

## Port Mappings

| Service | Host Port | Container Port |
|---------|-----------|----------------|
| Backend | 3000 | 3000 |
| Frontend | 5173 | 5173 |

### Notes

If you add new npm dependencies, you need to rebuild the image: `docker compose up --build`
The `.env` file for the backend is loaded via the `env_file` directive in `docker-compose.yml`
Both docker containers are set to restart automatically (`unless-stopped`)
