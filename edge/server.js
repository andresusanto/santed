const express = require('express');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const bodyParser = require('body-parser');
const cors = require('cors');

const schema = require('./data/schema');

const PORT = process.env.PORT || 8081;
const graphQLServer = express();

graphQLServer.use(cors());
graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
graphQLServer.use('/explorer', graphiqlExpress({ endpointURL: '/graphql' }));

graphQLServer.listen(PORT, () => console.log(
    `GraphiQL is now running on http://localhost:${PORT}/explorer`
));
