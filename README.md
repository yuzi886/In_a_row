# Inarow

Everyone's favorite checkers game!

## Structure
1. Frontend/client:
    * Everything related to forentend is stored in the cilient folder
    * Use __npm start__ to run the react app from the client folder
    * All packages related to frontend should be downloaded into the client folder and saved to it's package.json and package-lock.json
        * This is done by typing __npm install "Package-name" --save__ inside the client folder
2. Backend
    * Everything on the backend is stored outside(../) of the client folder
    * use __npm run dev__ to start the node server with nodemon in the repo's root folder
    * All packages related to the backend should be downloaded to the repo's root folder and saved to it's package.json and package-lock.json
        * This is done by typing __npm install "Package-name" --save__ inside the repo's root folder


## Pull before you work!

1. Always pull down data from the branch you are working on before you start your work(done by command __git pull origin "Desired-branch"__)
    * If you get an error because you are missing a node(npm) package then go into the client folder if it is a frontend backage or go to the repo's root folder if it is a backend package. Then type the command __npm install__ 
        * Now your missing package should be there as it should have been pushed to the package.json and npm will look into this file and download missing dependencies. (For futher reading in this topic see: [dev.to](https://dev.to/saurabhdaware/but-what-the-hell-is-package-lock-json-b04))
            * It is therefore important when you install a new package that you use the --save flag and push the changes to the files package.json and package-lock.json so the rest of us get those updates


## Data base creation

* The files in folder db_creation is only to be ran once as the just generate the database and table once it is done at a machine if you run it again it will generate an error(The error wont cause any issues btw)
* You need a .env file in repo's root dir where you have the following stored:
    * PORT=3001
    * HOST=localhost
    * USER=your_sql_username
    * PASS=your_sql_password
    * DB=inarow
 