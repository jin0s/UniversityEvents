## Quick Start

``` bash
# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000
```

## DBS Connection
For some reason the MySQL wont support password protocol by default so we will have to modify the user previledges. Run the following query.
```sql
CREATE USER 'dev'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES;
```

## App Info

### Author

Jin Le
Jiayi Zhang

### Version

1.0.0
