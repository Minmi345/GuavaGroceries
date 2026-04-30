# Prerequisites

- Install docker-desktop (For window users, install wsl when prompted).
- docker-desktop needs to be started.
- We will use the commands below to pull only the docker and package-json files into your own branch. Nothing else will be affected.

## Pulling docker changes
_Do this often so you have all the latest dependencies_

#### _From the root directory_

1. Fetch the docker branch:
   ```bash
   git fetch origin main
   ```

## To pull Backend

1. Pull backend Docker + package files:
   ```bash
   git checkout origin/main -- backend/Dockerfile backend/docker-compose.yml
   git checkout origin/main -- backend/package.json backend/package-lock.json
   ```
   
2. Build and start (backend):
   ```bash
   cd backend
   docker compose up --build -d
   ```
## To pull Frontend

1. Pull frontend Docker + package files:
   ```bash
   git checkout origin/main -- frontend/Dockerfile frontend/docker-compose.yml
   git checkout origin/main -- frontend/package.json frontend/package-lock.json
   ```
2. Build and start:
   ```bash
   cd frontend
   docker compose up --build -d
   ```

## Pushing New Dependencies

When you install new packages, push the updated `package.json` and `package-lock.json` so everyone can pull them:

1. Make sure you're on your working branch and have committed your changes
2. Switch to the `main` branch:
   ```bash
   git switch main
   ```
3. Pull the updated package files from your branch to `main` branch (replace `your-branch` with your branch name):
   ```bash
   # For backend dependencies
   git checkout your-branch -- backend/package.json backend/package-lock.json
   git add backend/package.json backend/package-lock.json

   # For frontend dependencies
   git checkout your-branch -- frontend/package.json frontend/package-lock.json
   git add frontend/package.json frontend/package-lock.json
   ```
4. Commit and push:
   ```bash
   git commit -m "Update dependencies"
   git push origin main
   ```
5. Switch back to your branch:
   ```bash
   git switch your-branch
   ```

If you want to be nice, you can let others know they should fetch and pull the updates.

## Quick Start

### Backend

Run these two commands to start the backend:

```bash
cd backend
docker compose up -d
```

The backend will be available at `http://localhost:3000`.

### Frontend

```
cd frontend
docker compose up -d
```

The frontend will be available at `http://localhost:5173`.

### Run Both Together

From the project root:

```bash
docker compose -f backend/docker-compose.yml -f frontend/docker-compose.yml up --build -d
```

***

## Optional information

### How `git fetch` Works

- `git fetch origin docker` downloads all branch data but **touches nothing** in your working directory
- The downloaded data is stored in a hidden reference (`origin/docker`) and is inert
- Only `git checkout origin/docker -- file` actually places a file into your project — and only the file(s) you explicitly name
- Everything else on the `docker` branch stays in the background and has zero effect on your work

### Commands

| Command | Description |
|---------|-------------|
| `docker compose up --build` | Build and start (foreground) |
| `docker compose up -d --build` | Build and start (background, detached mode) |
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
- Both docker containers are set to restart automatically (`unless-stopped`)
