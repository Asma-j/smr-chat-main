# MsrChat
This project was generated using [Nx](https://nx.dev).
## Before start be sure that you install this below libs with the right versions:
nodejs:12.16.2

npm:6.9.x (intalled automaticly with nodejs)

mongodb: 4.4.6
## Development local starter
npm i
## After install in case of sass error //sacc-node error
npm rebuild node-sass 
##  start app 
npm run dev:smr-chat
npm run dev:smr-chat-api

# Code scaffolding starter

## Generate Angular app
`nx g @nrwl/angular:app msr-chat`
(after creation copy assets / update angular.json assets config / new theme in ms-themelib / get
## Generate Angular lib
`nx g @nrwl/angular:lib msr-chat/front/employee`
## Generate Angular module inside app
`nx g module msdcard --project=msr-chat --export` 
## Generate Angular component/service ...
`nx g component list-order --project=smr-chat-front-customer`

## Generate NestJs APP
`nx generate @nrwl/nest:application backend/apimsr-chat --frontendProject msr-chat`
## Generate NestJs lib
`nx g @nrwl/nest:library msr-chat/back/employee`
## Generate NestJs module inside app
`nx g module msdcard --project=msr-chat --export`
## Generate NestJs resouce full rest module
`nest g resource messages --sourceRoot="libs/smr-chat/back/messages" `

## Generate Shared lib (front - back) 
`nx g @nrwl/workspace:lib free-life/shared/models`
`nx g @nrwl/workspace:lib shared/front-back/widget`

## AFter lib generation FIX:
-> after creation (fix nx 11): -restore tsconfig.ts 

# NX & Angular

## Adding capabilities to your workspace
Nx supports many plugins which add capabilities for developing different types of applications and different tools.
These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [Angular](https://angular.io)
  - `ng add @nrwl/angular`
- [React](https://reactjs.org)
  - `ng add @nrwl/web`
- [Nest](https://nestjs.com)
  - `ng add @nrwl/nest`

## Build
Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests
Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).
Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests
Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).
Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace
Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help
Visit the [Nx Documentation](https://nx.dev/angular) to learn more.