import { createServer, Model, RestSerializer } from "miragejs";
import faker from "faker";
import {initialData} from './data'

faker.seed(111);

export default function setupMockServer() {
  createServer({
    serializers: {
      application: RestSerializer
    },

    models: {
      product: Model
    },

    routes() {
      this.namespace = "api";
      this.timing = 1000;
      this.resource("products");
    },

    seeds(server) {
      [...initialData].forEach(({name,image,price,catagory}) => {
        server.create("product", {
          id: faker.random.uuid(),
          name: name,
          image: image,
          price: price,
          description:faker.commerce.productDescription,
          catagory:catagory,
          rating:faker.random.float({'min':1,'max':5}).toFixed(1),
          hasDiscount:faker.random.boolean(),
          discount:faker.random.number({'min': 5,'max': 25}),
          fastDelivery:faker.random.boolean(),
          inStock:faker.random.boolean(),
          pixmartChoice:faker.random.boolean()
        });
      });
    }
  });
}
