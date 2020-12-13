# Subdocument Array mutation

## Structure

```
.
├── modules (modules folder)
│   └── mutation (module / context)
│       └── endpoints (API endpoints)
│           └── mutate.js
├── package.json
├── serverless.yml (serverless config)
├── handlers (functions config)
│   └── mutation-endpoints.yml (endpoints config)
├── shared (shared components)
│   ├── mutation.js **(algorithm to mutate)**
│   └── api.js (API Gateway response helper)
└── test (tests folder)
```

## Development environment 

This boilerplate uses `serverless-local` plugin and some containers and plugins to emulate the AWS Resources

```bash
yarn run dev
```
The applications will start on `http://localhost:3000`

### Dev Plugins

This boilerplate contains following plugins for local development: 

* [serverless-offline](https://github.com/dherault/serverless-offline/issues) - For run API Gateway local and manage plugins 
* [serverless-plugin-split-stacks](https://github.com/dougmoscrop/serverless-plugin-split-stacks) - Split Cloudformation Templates

## Production environment

### Deploy full services

```bash
serverless deploy -v
```

### Deploy a function 

```bash
serverless deploy function -f mutation
```

### Get function logs

```bash
serverless mutation -f test -t
```

### Clean All

```bash
serverless remove
```

## Testing

### All Tests

```bash
yarn run test
```

### Unit Tests

```bash
yarn run unit-test
```

### Integration Tests

```bash
yarn run integration-test
```

## TODOs

- [ ] Add Coverage Testing
- [ ] Add automated build in CircleCI
- [ ] Add Mongo and test the mutations 
- [ ] Set a background lambda and split the request for change in DB and the actual execution (adding an endpoint to see if transaction was completed)