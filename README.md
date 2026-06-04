# FAO Nick

Added a root level package.json for convenience, to install packages, initialise the database and run the app, from the root just run these 2 commands

 - npm run init
 - npm run start

## Approach

I approached this with a strong bias toward simplicity and type safety across the full stack. 

For the API layer I chose tRPC, which gives end-to-end TypeScript inference between the server and client without any separate schema language or code generation step — the router type itself becomes the contract, so a change on the server surfaces immediately as a type error on the client. This felt like the right tool for a TypeScript-first project where schema drift between client and server is a common source of bugs. 

For the database I chose Drizzle ORM with SQLite via better-sqlite3: Drizzle is deliberately lightweight and derives TypeScript types directly from the schema definition, which meant I could avoid writing manual row-mapping code and have the compiler catch column mismatches automatically. The synchronous nature of better-sqlite3 also kept the server code straightforward — no async/await chains for database calls. 

The broader architectural decision was to keep game logic entirely on the client and only use the server for persistence: the client maintains game state in React, runs the win-condition algorithm locally, and calls the server twice per game — once to resolve player identities on start, once to persist the result on completion. This kept the API surface minimal, avoided unnecessary round-trips during gameplay, and meant the server has no opinion about game rules.

The game board is stored as a flat single-dimension array rather than a 2D array. Any cell is addressed with `row * boardSize + col`.

Error handling has not been implemented. In a production application I would likely use `@trpc/react-query`, which exposes `isError`, `error`, and `isPending` states directly on mutations and queries — making it straightforward to surface server or transport failures to the user without manual `try/catch` wiring around every call.


# Tic-Tac-Toe
The below problems are to allow us a glimpse into your problem solving ability, style and current skill set. Vibe coding is allowed but we are looking for good taste, brevity and clarity in your code. 

## Problems
### Problem 1
We have started a basic game of Tic-Tac-Toe as outlined [here](https://en.wikipedia.org/wiki/Tic-tac-toe) but we don't have anyone good enough to code to finish it! 
- Please implement a complete basic game of Tic-Tac-Toe
- Please use React and TypeScript throughout, if you know TailwindCSS please expand on what is already provided, otherwise it is fine to use raw styling 
- Both players will play out of the same application, it is sufficient to just switch the current player each time a move is played
- Once a game is completed, I should be able to start another game 

### Problem 2
We are bored with the basic game now, can you make it so the board can be scaled to any size? 
- Add some kind of input which allows me to change the board size
- The board size should be a number between 3 and 15 

### Problem 3
We want to store game results in a database.
- Create a simple backend server
- Use any SQL database to store the results, please structure it in a relational manner and in a way for it to be expanded for future use cases 
- Display simple stats back to the user including number of win and losses for each player

## Quickstart
- Make sure you have **node** installed
- `cd client`
- `npm i`
- `npm start`

## Submission
Once you are done please submit the public repo to your recruiter or invite nick@spruce.eco to your private repo and let your recruiter know. 
