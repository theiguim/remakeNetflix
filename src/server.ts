import express from "express";
import {sequelize} from "./database"
import { adminJs, adminJsRouter } from "./adminjs";
import path from "path"

const app = express();

app.use(express.static(path.join("public")));

app.use(adminJs.options.rootPath, adminJsRouter);

const PORT = 3000;

app.listen(PORT, ()=> {
    sequelize.authenticate().then(()=>{
        console.log("DB connection sucessfull");
    })
    console.log(`Server running on ${PORT}`)
});