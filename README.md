# Key Value Store

A version controlled key-value store with a HTTP API. This project is done using a Node.js Express server as the backend with Postgres as the database of choice.

#### Installation
```
~ git clone git@github.com:jerroldlaw/keyvaluestore.git
~ npm i
```
Use ./db/db.sql as a dump to initialize your PG database.

#### Environmental Variables
Create a .env file for the production database URL and a .env.test for the test environment.
```
DATABASE_URL=postgres://user:pass@example.com:5432/demo
```

##### Getting latest value of key
```http
Method:   GET
Endpoint: /object/mykey
Response: {"value": value1 }
```

##### Getting value of key based on timestamp
```http
Method:   GET
Endpoint: /object/mykey?timestamp=1440568980
Response: {"value": value2 }
```

##### Set the value of a key
```http
Method:   POST
Endpoint: /object
Body:     JSON: {mykey : value2}
Response: {"key":"mykey", "value":"value2", "timestamp": time }
```

#### To run
```
npm start
```

#### To test
```
npm test
```
![test results](https://i.imgur.com/kvD7eNM.png)

## Assumptions
Since no constraints were specified, the POST method will allow any non-null input for both the key and value input of any length.


