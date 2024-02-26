import dotenv from 'dotenv';

dotenv.config({
    path: "../astroquantum-ju/.env"
});
import connectDB from './db/index.js';
import { app } from './app.js';

connectDB()
.then( () => {
    app.on("error", ()=>{
        console.log("Database couldnot communicate with the app. Error : ", error);
        process.exit(1);
    });

    app.listen( process.env.PORT || 8000, () => {
        console.log(`Server is running on the port ${process.env.PORT || 8000}`);
    } );

    app.get('/', function(req, res){
        res.send('Welcome to the server of AstroQuantum JU');
    });

    app.get('/favicon.ico', (req, res) => {
        res.status(204).end();
    });
} )
.catch( ( error ) => {
    console.log(`Error occured after connecting the database. Error `, error?.message );
} );