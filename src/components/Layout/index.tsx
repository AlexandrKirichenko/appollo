import {gql, useQuery} from '@apollo/client'
import React,{useEffect} from "react";
import "./Layout.module.scss";
import style from "./Layout.module.scss";
import {useHistory} from 'react-router-dom';

interface LayoutProp {
    children: React.ReactNode;
}

const Layout:React.FC<LayoutProp> = ({children }) => {
    
    // const SIGIN = gql`
    //     query signIn(
    //         $email: String!
    //         $password: String!
    //     ) {
    //         signIn(
    //             email: $email,
    //             password: $password,
    //         )
    //         {
    //             token
    //             user {
    //                 email
    //                 id
    //                 avatar
    //                 login
    //             }
    //         }
    //     }
    // `;
    //
    //
    // const ME = gql`
    //     query UserInfo {
    //         me {
    //             token
    //             }
    //         }
    // `
    //
    // const router = useHistory()
    // useEffect(() => {
    //     router.push("/chatBlock")
    // }, [])
    // const { loading, data, error } = useQuery(ME)
    //
    //     // if (loading) {
    //     //     return 'Loading...'
    //     // }
    //     //
    //     // if (error) {
    //     //     return error
    //     // }
    //
    //     if (!data?.me?.user) {
    //         return null
    //     }
    //
        
    
    return (
            <div className={style.container}>{children}</div>
    )
}

export default Layout;