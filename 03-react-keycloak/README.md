# hello-react / 03-react-keycloak

Authentication with React, prototype of YCC stack (but no DB). [This guide](https://medium.com/devops-dudes/secure-front-end-react-js-and-back-end-node-js-express-rest-api-with-keycloak-daf159f0a94e) and [this one](https://www.section.io/engineering-education/keycloak-react-app) were a big help.

Components:

- `frontend-react`: as the name suggests a React frontend, port 10300 (TypeScript, MUI, Axios, gts)
- `keycloak`: Keycloak service, port 10301 (Docker)
- `backend-fastapi`: FastAPI backend, port 13002 (Python)

## Keycloak Info

To manage log in with admin / admin.
