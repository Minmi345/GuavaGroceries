cool GuavaGroceries web application!!!

# For Developers
## Prerequisites
- node.js
- npm
- no database (for now)

## installation

When you install repo, try to run a command in **root** folder:
> npm run install-all

Also add **dotenv** file to backend folder and write inside **PORT=3000** or whatever port you want to use

## Commands

To run everything at the same time (write from the route folder):

> npm run all

To run backend:

> npm run backend

To run frontend:

> npm run frontend

To run eslint (done from frontend or backend folder):

> npm run eslint

## Working with naming convections

For naming files in js, I use kebab-case (f.e. user-password-controller.js)

For naming variables: camelCase.

## GitHub issues
Works as JIRA :D

It can add automatically branches as well and could be assigned to person

## PreCommit rules
Before commiting, do not forget to run eslint! 

And feel free to edit README file :)

## Frontend

Built with React, Vite, Tailwind CSS and configured as a PWA (Progressive Web App).

### Additional prerequisite for frontend

Docker must be running before starting the frontend.

### Running the frontend with docker

Add a .env file inside the frontend folder and paste VITE_API_URL=http://localhost:3000 inside it. This tells the frontend where to send API requests.

On your terminal paste this:

cd frontend
docker compose up --build

The app will be available at http://localhost:5173.

### Pages and their purpose

- HomePage: Landing page with login and register options.
- LoginPage: Login with phone number and password.
- RegisterPage: Create a new account (directed to LoginPage after).
- DashboardPage: Main hub after logging in.
- AccountPage: Shows account details and log out option.
- GroupPage: View group members and split receipts.
- StatisticsPage: Monthly spending and budget chart.
- UploadPage: Upload an image to be parsed.

### Frontend naming conventions

Page and component files use PascalCase.

Variable names use camelCase.

### How the frontend talks to the backend

All API calls go through src/lib/api.js. It automatically attaches the JWT token from localStorage to every request. To use it in a page:
```js
import { apiFetch } from '../lib/api'

const data = await apiFetch('/auth/login', {
  method: 'POST',
  body: JSON.stringify({ phone_number, password }),
})
```
### What the backend must do for the frontend to work

- Enable CORS for http://localhost:5173.
- Return JSON in every response.
- All routes except /auth/register and /auth/login must check the Authorization: Bearer token header.

### PWA

The app can be installed on iphone, android and desktop. Go to the site in a browser and add it to home screen. 

### These are the pages which use mock data and need real API endpoints to work fully

- LoginPage — needs POST /auth/login.
- RegisterPage — needs POST /auth/register.
- UploadPage — needs POST /receipts.
- StatisticsPage — needs GET /statistics.
- GroupPage — needs GET /groups/members and GET /groups/receipts.
- AccountPage — needs GET /users/me.

