import {ApolloClient, InMemoryCache,createHttpLink} from '@apollo/client'
import { setContext } from '@apollo/client/link/context';

const link =  createHttpLink(
    {uri: process.env.REACT_APP_MY_COOL_LINK} )

const authLink = setContext((_, { headers }) => {
    
    const token = localStorage.getItem('token');
   
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});
// export const client = new ApolloClient({
//     uri: process.env.REACT_APP_MY_COOL_LINK,
//     cache: new InMemoryCache(),
//     link: createHttpLink({
//         uri: process.env.REACT_APP_MY_COOL_LINK,
//         headers: {
//             'access-token': localStorage.getItem('access-token') || null,
//         }
//     })
//
// });
export const client = new ApolloClient({
    uri: process.env.REACT_APP_MY_COOL_LINK,
    cache: new InMemoryCache(),
    link: authLink.concat(link)
});