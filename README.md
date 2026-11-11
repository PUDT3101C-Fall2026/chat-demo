# Chat Demo

Here's a demo of a simple chat server using Web Sockets. For the server, we're

When you download the repository, run:

```bash
npm install
```

## Running the Client

You can run the client with the script:

```bash
npm run client
```

## Running the Server

In class, we'll use a shared server, but if you want to run the server on your own, run the following command:

```bash
npm start
```

**You'll need to run both scripts at the same time in separate terminals.**

## Protocol

Our application works by sending messages back and forth. Every message is a JSON object with a `type` field.

### Client

#### Change Username

If the client wants to change its username, it sends the following message:

```json
{
    "type": "username",
    "name": name
}
```

#### Send Message

Once the client has a chat message to send, it sends the following message:

```json
{
    "type": "message",
    "message": message
}
```

### Server

The following messages are sent by the server (and must be interpreted by the client):

#### Hello

When a client connects, the server sends a message with the client's ID and makes up a username for the client.

```json
{
    "type": "hello",
    "userId": id,
    "name": name
}
```

#### Updated User List

Whenever a new user joins, leaves, or updates their name, the server sends out a list of the current users to everyone.

```json
{
    "type": "users",
    "users": [
        "userId": id,
        "name": name,
        "connected": boolean
    ]
}
```

#### Message

Whenever a user sends a message, the server sends out an event with the message to every user.

```json
{
    "type": "message",
    "message": messageText,
    "userId": authorId,
    "time": time
}
```
