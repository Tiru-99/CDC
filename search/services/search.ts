import type { Request , Response } from "express"; 
import { client } from "../config/elasticsearch";

interface Document {
  id : string ; 
  name : string ; 
  price : number ; 
}

export class SearchService {
  static search = async( req : Request , res : Response) => { 
    const { search } = req.query ;
    
    if(!search){
      return ; 
    }
    
    try {
      const results = await client.search<Document>({
        index : "products", 
        query : {
          match : { name : search.toString() }
        }
      }); 
      
      res.status(200).json({
        message : "Successfully got the results", 
        results 
      }); 
    } catch (e){
      console.error("[ERR] : something went wrong while searching" , e);
      res.status(500).json({
        message : "Something went wrong while searching" 
      })
    }
    
  }
}