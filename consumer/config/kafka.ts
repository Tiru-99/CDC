import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "cdc-search-consumer",
  brokers: ["localhost:9092"],
});