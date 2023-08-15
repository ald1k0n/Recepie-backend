import { config } from 'dotenv';
config();
import express from 'express';

const app = express();
app.use(express.json());

app.use('/api', require('./routes/api'));

app.listen(process.env.PORT || 8080, () => {
	console.log(`Server started at port ${process.env.PORT || 8080}`);
});
