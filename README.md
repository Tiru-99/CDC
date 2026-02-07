# 📌 CDC Pipeline for a super scalable search engine (Postgres → Elasticsearch)

A **Change Data Capture (CDC) pipeline** that streams real-time database changes from **PostgreSQL** to **Elasticsearch** using **logical replication**.

Built to demonstrate **event-driven backend systems**, real-time data synchronization, and scalable search indexing.

---

##  What This Project Does

- Listens to **PostgreSQL WAL (Write-Ahead Log)** using logical replication
- Captures **INSERT / UPDATE / DELETE** events in real time using Debezium
- Transforms database changes into structured events
- Sends the change events to Kafka broker for processing
- Kafka consumer listens for event and then indexes data in **ElasticSearch**
- Keeps the database and search layer in **near-real-time sync**

## Why CDC?

Traditional systems rely on polling or cron jobs, which are:

- ❌ Slow  
- ❌ Inefficient  
- ❌ Not real-time  

CDC solves this by:

- Streaming changes as **events**
- Eliminating redundant database queries
- Powering **search, analytics, feeds, and projections**

This architecture is widely used in **high-scale backend systems**.

---

## Architecture

![CDC Architecture](./architecture.png)

## Tech Stack

- **Runtime:** Bun
- **Language:** TypeScript
- **Database:** PostgreSQL (Logical Replication)
- **Search Engine:** Elasticsearch
- **Distributed Log:** Apache Kafka and Debezium
- **Architecture:** Event-driven (CDC) 

---