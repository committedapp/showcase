import express from 'express';
import {db, connectToDb} from "./db.js";
import cors from "cors";
import {fileURLToPath} from 'url';
import path from "path";
import 'dotenv/config';
const __fileName=fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirName,'../dist')));

app.get(/^(?!\/api).+/,(req,res)=>{
    res.sendFile(path.join((__dirName,'../dist/index.html')))
})

app.get('/api/demands', async (req, res) => {
    const demands = await db.collection('demands').find({}).toArray(function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result)
        }
    });
})

app.post('/api/demands', async (req, res) => {
    const {fullName,company,industry,email,detail} = req.body;
    await db.collection('demands').insertOne({fullName,company,industry,email,detail}, {
        $push: {demands: {fullName, company,industry,email,detail}},
    })

    const article = await db.collection('demands').findOne({fullName,company,industry});
    res.json(article);

});
const PORT = process.env.PORT || 8001;
connectToDb(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on ${PORT} port`)
    })
})
