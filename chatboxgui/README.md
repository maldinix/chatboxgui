# CISC 475 Chatbot GUI

This is a node application that uses electron to present the user with a GUI

## Requirements
* NodeJs 7.0.0 (or newer) and NPM 3.10.0 (or newer)

## How to run and install requirements
1. Change into the root directory of the project
2. Run ```npm install``` if there is not currently a node_modules directory
3. Run ```npm install electron```
4. Run ```npm install --save node-wit```
5. Finally, to run the application run ```node_modules/.bin/electron .```

## Things done:
* Obtain file path from drag and drop
* Chose a file hashing library
* Obtain and return the hash of the droped file
* Use cyber2020 Rest API calls to get JSON data

## Things left to do:
* Interact with JSON data smartly
* Connect witai with user input and JSON response
