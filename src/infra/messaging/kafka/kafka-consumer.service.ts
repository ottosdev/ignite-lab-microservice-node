import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        brokers: ['welcome-giraffe-11398-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'd2VsY29tZS1naXJhZmZlLTExMzk4JB53EdJyELFjAntKmKkdwzkmemIGggYi6AY',
          password: 'aab2a2fc0a624142b1cafd8182071bd8',
        },
        ssl: true,
      },
    });
  }
  async onModuleDestroy() {
    await this.close();
  }
}
