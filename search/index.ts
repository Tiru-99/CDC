import express from "express"; 
import type { Request , Response } from "express";
import { CrudService } from "./services/crud";
import { SearchService } from "./services/search";
const app = express(); 

const PORT = 5000 ; 

app.use(express.json()); 

app.get('/' , ( req : Request , res : Response) => {
    return res.json({
      message : "Getting something on the main page"
    }); 
}); 

//crud
app.post("/products", CrudService.insertData);
app.get("/products/:id", CrudService.getData);
app.put("/products/:id", CrudService.updateData);
app.delete("/products/:id", CrudService.deleteData);

//search 
app.get("/search" , SearchService.search); 

app.listen(PORT , () => {
  console.log(`listening to PORT ${PORT} on a backend server`);
})