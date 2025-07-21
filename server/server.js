import express from 'express';
import "dotenv/config";
import cors from 'cors'

// Initialize Express App

const app = express();



// MiddleWares
app.use(cors());
app.use(express.json());


//Router

app.get('/', (req, res) => res.send("Server is running!"))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));