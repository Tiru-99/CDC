import { kafka } from "./config/kafka";
import { client } from "./config/elasticsearch";

// async function checkHealth() {
//   try {
//     const health = await client.cluster.health();
//     console.log("the health of es is", health);
//   } catch (error) {
//     console.error("Connection failed:", error);
//   }
// }


const consumer = kafka.consumer({ groupId: "search-indexer" });
await consumer.connect();
await consumer.subscribe({ topic: "cdc.public.products", fromBeginning: true });

await consumer.run({
  eachMessage : async ({ message }) => {
    if(!message.value) return ; 
    const event = JSON.parse(message.value.toString()); 
    
    const payload = event.payload ; 
    const { op } = payload ;
    const { id , name , price , created_at } = payload.after ; 
    
    if( op === "c" || op === "u"){
      await client.index({
        index : "products" , 
        id : id.toString() , 
        document : {
          id , 
          name ,
          price , 
          created_at
        }
      }); 
      
      console.log(`[ES] successfully indexed document ${id}`); 
    } 
    
    if( op === 'd'){
      const id = payload.before.id ; 
      await client.delete({
        index : "products" , 
        id : id.toString() 
      });
      console.log(`[ES] successfully deleted document ${id}`); 
    }
  }
})


