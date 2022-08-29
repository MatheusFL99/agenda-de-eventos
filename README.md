# Calendario de eventos

Aplicação web onde o usuário pode criar uma conta e adicionar eventos em uma agenda. Aplicação desenvolvida utilizando: Node.Js, Express, React.Js e MongoDB

## Installation

### Prerequisites

- node
- npm
- mongodb

1. Clone this repository

2. Install server dependencies
   ```bash
   $ cd server
   $ npm install
   ```
3. Create a .env file with the constants
   ```bash
   MONGO_URI=yourmongourihere
   JWT_SECRET=yoursecrethere
   ```
4. Install client dependencies
   ```bash
   $ cd client
   $ npm install
   ```

## Run the app

1. Start mongodb
   ```bash
   $ mongod
   ```
2. Start the server
   ```bash
   $ cd server
   $ npm start
   ```
3. Start the client
   ```bash
   $ cd client
   $ npm start
   ```
4. Browse to `http://localhost:3000/`
