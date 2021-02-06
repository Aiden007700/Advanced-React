import { config, createSchema } from '@keystone-next/keystone/schema';
import 'dotenv/config';
import {insertSeedData} from "./seed-data";

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360, // How long they stay signed in?
    secret: process.env.COOKIE_SECRET,
};
export default config({
    server: {
        cors: {
            origin: [process.env.FRONTEND_URL],
            credentials: true,
        },
    },
    db: {
        adapter: 'mongoose',
        url: process.env.DATABASE_URL,
        // async onConnect(keystone) {
        //     console.log('Connected to the database!');
        //     if (process.argv.includes('--seed-data')) {
        //         await insertSeedData(keystone);
        //     }
        // },
    },
    lists: createSchema({
        // Schema items go in here
        // User,
        // Product,
        // ProductImage,
        // CartItem,
        // OrderItem,
        // Order,
        // Role,
    }),
    // extendGraphqlSchema,
    ui: {
        // // Show the UI only for poeple who pass this test
        // isAccessAllowed: ({ session }) =>
        //     // console.log(session);
        //     !!session?.data,
        isAccessAllowed: () => true
    },
    // session: withItemData(statelessSessions(sessionConfig), {
    //     // GraphQL Query
    //     User: `id name email role { ${permissionsList.join(' ')} }`,
    // }),
})