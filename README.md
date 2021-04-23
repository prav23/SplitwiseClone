# SplitwiseClone Steps to Run

•	Kafka Installation:
o	Download the kafka latest release and un-zip it.
o	Go to kafka directory: cd kafka_2.11-1.1.0
o	Start Zookeeper: bin/zookeeper-server-start.sh config/ zookeeper.properties
o	Start Kafka :  bin/kafka-server-start.sh config/server.properties
o	Create Topics in : /kafka_topics

•	React-Client
o	Go to frontend folder
o	npm install
o	npm start

•	Node Backend
o	Go to backend folder
o	npm install
o	node app.js

•	Kafka Backend
o	Go to kafka backend folder
o	npm install
o	node server.js

