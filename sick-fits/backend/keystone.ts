import { config, createSchema } from "@keystone-next/keystone/schema";
import "dotenv/config";
import { insertSeedData } from "./seed-data";
import { User } from "./schemas/User";
import { createAuth } from "@keystone-next/auth";
import {statelessSessions, withItemData} from "@keystone-next/keystone/session";
import {Product} from "./schemas/Product";
import {ProductImage} from "./schemas/ProductImage";

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long they stay signed in?
  secret: process.env.COOKIE_SECRET
};

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"]
    // TODO add in roles
  }
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true
      }
    },
    db: {
      adapter: "mongoose",
      url: process.env.DATABASE_URL,
      async onConnect(keystone) {
          console.log('Connected to the database!');
          if (process.argv.includes('--seed-data')) {
              await insertSeedData(keystone);
          }
      },
    },
    lists: createSchema({
      // Schema items go in here
      User,
      Product,
      ProductImage,
      // CartItem,
      // OrderItem,
      // Order,
      // Role,
    }),
    // extendGraphqlSchema,
    ui: {
      // Show the UI only for people who pass this test
      isAccessAllowed: ({ session }) => {
          console.log(session)
          return !!session?.data
      }
    },
    session: withItemData(statelessSessions(sessionConfig), {
        // GraphQL Query
        // User: `id name email role { ${permissionsList.join(' ')} }`,
        User: 'id'
    }),
  })
);
