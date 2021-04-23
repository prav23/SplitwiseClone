const connection = require('./kafka/Connection');

require('./models');

const expenseService = require('./services/expenses');
const expenseCommentsService = require('./services/expensecomments');

function handleTopicRequest(topic_name, fname) {

  const consumer = connection.getConsumer(topic_name);
  const producer = connection.getProducer();

  console.log('server is running ');

  consumer.on('message', (message) => {
    console.log(`message received for ${topic_name} `, fname);
    //console.log(JSON.stringify(message.value));
    const data = JSON.parse(message.value);
    console.log(fname);
    console.log("Data is: ",data);
    fname.handle_request(data.data, (err, res) => {
      console.log(`after handle${res}`);
      const payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];
      producer.send(payloads, (dataBack) => {
        console.log("Data sending back: " ,dataBack);
      });
    });
  });
}

// first argument is topic name
// second argument is a function that will handle this topic request
handleTopicRequest('expenses', expenseService);
handleTopicRequest('expenseComments', expenseCommentsService);
