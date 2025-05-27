# VisaApp

## Project Overview
This project is a web application that will collect DS-160 information to modernize the non-immigrant visa application currently housed on ceac.state.gov. 
It uses a frontend built with Next.js and stores it in a PostgreSQL database via a FastAPI backend.

The US Web Design System (USWDS) https://designsystem.digital.gov/components/overview/ is used to build the user interface in a consistent and accessible way. The open-source TrussWorks React Library is used https://trussworks.github.io/react-uswds/?path=/docs/welcome--docs to implement parts of this design system.

## Target Architecture
This project will be deployed to State's [CloudCity AWS Platform](https://confluence.fan.gov/pages/viewpage.action?spaceKey=CCPL&title=How+To%3A+As+a+new+user%2C+log+into+Cloud+City+resources+for+the+first+time).

This application will be deployed somewhat like this:
- Postgres on AWS Aurora (or RDS)
- Python container running our backend on EKS
- Static files for frontend on S3

As we spin up the project, we should add details about CI/CD, deployment, links to different environments, and external APIs to this README.

## Local Development
Currently we are developing on GitHub CodeSpaces (as a stopgap until we get State development laptops).
Instructions below assume you're using CodeSpaces, but they might work on a different Unix environment.

### Local Development Architecture
- Docker-compose (see `docker-compose.yml` in the root folder) that coordinates
  - Python container running our Python backend in `/backend`
  - Postgres container initialized with `init.sql` in the root folder
- All wrapped up in a host ubuntu devcontainer (see `devcontainer/devcontainer.json`) with Node and docker-in-docker tooling. Our frontend runs on this host.

### Prerequisites
- GitHub CodeSpaces
- Visual Studio Code
  - Recommended extensions: `GitHub Codespaces`, `Dev Containers`

### Installation Steps
1. Open the repo or branch in a Codespace using the GitHub UI.
   - In the Code button where you normally see the Clone options, use the Codespaces tab and create a new Codespace
   - You can open this CodeSpace in VSCode. You can also open a CodeSpace directly from VSCode
   - Spining up the Codespace the first time takes a while - maybe grab a coffee.
1. Once it's up, `docker compose up`
1. http://127.0.0.1:8000/docs should show our FastAPI docs
1. cd frontend and npm run dev should spin up local dev
1. http://127.0.0.1:3000/ takes you to our frontend
1. Submitting the "user" form should return a success

### Debugging things locally
- If things don't show up in the browser, test if it's a Codespace port forwarding issue
  - inside the Codespace on the host, curl localhost:8000/docs
  - If it's returning within the Codespace but not in the browser, go to the Ports tab in VS Code and re-confirm Private visibility for the port (possibly [known issue?](https://github.com/microsoft/vscode/issues/228676))
- Using the Docker tab in VS code to restart Docker containers and delete images so they can be rebuilt
- Right click the running container and "Attach shell" - can check processes & ports running there. as well

## Code repos
Currently we are running on two source repositories - one on the USDS GitHub and one on State GitLab.
Once we are fully set up on State local dev environments, we will transition to solely being housed on State GitLab.

TODO: Instructions for pulling and pushing to both source repos.