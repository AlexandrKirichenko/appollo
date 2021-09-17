import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {ApolloProvider} from "@apollo/client";
import {client} from './client'

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);









// {
//     name: "graphql Schema",
//         "schemaPath": "schema.json",
//     "extensions": {
//     "Default graphql endpoint": {
//         "url": REACT_APP_MY_COOL_LINK,
//             "headers": {
//             "user-agent": "JS graphql"
//         },
//         "introspect": true
//     }
// }
// }
// }