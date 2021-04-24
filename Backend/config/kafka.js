const kafka = require('kafka-node');


function ConnectionProvider() {

  this.getConsumer = function (topic_name) {
   
    this.client = new kafka.KafkaClient(
      {kafkaHost:'ec2-52-15-69-100.us-east-2.compute.amazonaws.com:9092'}
      //{kafkaHost: process.env.KAFKA_URL}
      );
    this.kafkaConsumerConnection = new kafka.Consumer(this.client, [{ topic: topic_name, partition: 0 }]);
    this.client.on('ready', () => { console.log('client ready!'); 
    });

    return this.kafkaConsumerConnection;
  };

  // Code will be executed when we start Producer
  this.getProducer = function () {
    if (!this.kafkaProducerConnection) {
     
      this.client = new kafka.KafkaClient(
        {kafkaHost:'ec2-52-15-69-100.us-east-2.compute.amazonaws.com:9092'}
        // {kafkaHost:process.env.KAFKA_URL}
        )
        ;

      const { HighLevelProducer } = kafka;
      this.kafkaProducerConnection = new HighLevelProducer(this.client);

      console.log('producer ready');
    }
    return this.kafkaProducerConnection;
  };
}
module.exports = new ConnectionProvider();
