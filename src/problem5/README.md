<p align="center">
  <a href="#" target="blank"><img src="./logo.svg" width="100" alt="Health Management Web Application" /></a>
</p>

<h1 align="center">Resource Management API</h1>

# Introduction

The Resource Management API is a RESTful API designed to manage resources in a system. It provides endpoints for creating, reading, updating, and deleting resources.

# What I done?

- [x] Setup source code with Clean Architecture
- [x] Setup Stylelint and Eslint for code quality
- [x] Setup Prettier for code formatting
- [x] Setup Jest for unit testing
- [x] Setup Swagger for API documentation
- [x] Setup husky for git hook
- [x] Docker Compose setup for local development
- [x] Database Design (PlanUML)
- [x] Database Migration
- [x] Authentication (JWT)
- [x] Create User API
- [x] Body Record API
- [x] Unit Test

# Output

![Swagger Documentation](./swagger_document.png)

![Unit Test Results](./unittest_result.png)

# Folders Structure

The following is a typical folder structure for implementing Clean Architecture in a NestJS application:

```
.
├── + core
│   ├── + base
│   │   ├── - entity.ts
│   │   ├── - mapper.ts
│   │   ├── - repository.ts
│   │   └── - use-case.ts
│   │
│   ├── + domain
│   │   ├── + entities
│   │   └── + mappers
│   │
│   └── + repositories
│
├── + infra
│   ├── + data
│   └── + framework
│
├── + shared
│   └── + dtos
│
└── + use-cases
```

- `core`: contains the business logic of the application, such as entities, use cases, and interfaces.

- `infra`: contains the implementation of the interfaces defined in the core, such as data sources and services.

- `shared`: contains code that can be shared between multiple modules, such as models and DTOs.

- `use-cases`: contains the implementation of the use cases defined in the core, such as controllers and middleware.

## Installation

### Setup Docker

```bash
cd docker
docker compose up -d
```

### Install dependencies

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# test coverage
$ yarn run test:cov
```
