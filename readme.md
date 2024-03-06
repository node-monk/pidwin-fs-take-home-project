# Pidwin Assessment

The Pidwin Fullstack Assessment.

## Project setup

Enter each folder:

- backend
- frontend

and run the following command

```bash
npm install
```
---


## Backend
Now in the backend folder. 

For this Demo, I setup a local Docker mongo db. The .env
file is already configured for the local instance that
will be launched in Docker Composer.

Note that the mongourl could simply point to another host and the
rest of the configuration ignored. 

Also note that in a Production environment, I would not
have the senstive values hardcoded in the.env, but instead pull those from  Secrets Management as needed.

## Start the Local Database
```bash
docker compose up
```

Run the start
   command
   ```bash
   npm run start
   ```

The backend is now up and running.


When completed with testing Demo run
```bash
docker compose down
```

---

## Frontend

The frontend is your standard create-react-app, the default ReadME is provided under frontend/readme.md for reference.

Application will be running from localhost:3000
