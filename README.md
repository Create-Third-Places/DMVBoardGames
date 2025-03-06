
This repo contains the source code for https://dmvboardgames.com/, a website to promote in person board games in the DMV area.

Contact gulu@createthirdplaces.com if you are interested in learning more or want to share feedback. 

## How to run locally

### Setup
-npm install
-npm install --save-dev --save-exact prettier
### Running in dev mode
-npm run dev
### Creating a preview
-npm run build
-npm run preview

### Running unit tests

-node --test

### Running unit tests that have a specific word in their test file name
node --test "**/*Event*"

### Running unit tests with a specific test name pattern
node --test --test-name-pattern="empty result"





