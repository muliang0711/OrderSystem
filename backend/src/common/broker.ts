
import amqp from 'amqplib'

const RABBITMQ_URL = 'amqp://localhost';

async function createBroker(){
    try{
        // 1. connect to rabbitMq server 
        const connection = await amqp.connect(RABBITMQ_URL);
        // 2. creating a channel :
        const channel = await connection.createChannel();

        // 3. Declare a Exchange 
        const ExchangeName = 'orderExchange';
        const ExchangeType = 'direct'; // direct type depends routing key to match :
        await channel.assertExchange(ExchangeName , ExchangeType , {
            durable : true , 
        })

        // 4. Declare a Queue :
        const QueueName = "OrderQueue";
        await channel.assertQueue(QueueName,{
            durable : true ,
        });

        // 5. Bind them together (with routhing key ):
        const RoutingKey = 'order.created';
        await channel.bindQueue(QueueName , ExchangeName , RoutingKey);

        console.log("match success");

        setTimeout(() => {
        connection.close();
        process.exit(0);
        }, 500);


    }catch(err){
         console.error('[✖] Error while setting up broker:', err);
    }

}
createBroker();