# buddy-cue-api
buddy-cue-api is the server application for Buddy Cue.

### Building and running the server application

When you're ready, start the application by running:
`docker compose up --build`.

The application will be available at http://localhost:5050.

### Checking operation

You can check the operation of this server with the route http://localhost:5050/health

During normal operation, this route should return JSON as follows:
```
{
    "ok": true,
    "atlasUriEnv": true
}
```

Where `atlasUriEnv` indicates the environment variable for the MongoDB Atlas service is imported from the necessary .env.
