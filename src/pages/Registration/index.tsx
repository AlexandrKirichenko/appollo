import {gql,useMutation} from '@apollo/client'
import {FormikConfig, useFormik} from 'formik'
import React, {useContext, useEffect} from 'react'
import "./Registration.module.scss";
import * as yup from 'yup';
import Avatar from "../../components/Avatar";
import Input from "../../components/Input";
import AvatarInput from "../../components/AvatarInput"
import style from "./Registration.module.scss";
import classnames from 'classnames';
import {AuthContext} from '../../App';
import {RegistrationUserCredentials} from "../../types";
import Button from "../../components/Button";


const REGISTER = gql`
    mutation registration(
        $avatar: String!
        $email: String!
        $password: String!
        $login: String!
    ) {
        registration(
                avatar: $avatar,
                email: $email,
                password: $password,
                login: $login,
        )
        {
            token
            user {
                login
                email
                id
                avatar
            }
        }
    }
`;

const Registration: React.FC = () => {
    const context = useContext(AuthContext);
    const [registrationUser, {data, loading, error}] = useMutation(REGISTER, {
        errorPolicy: 'all',
    })
 
    useEffect(() => {
        const autorizedUser = data && data.registration
        const token = autorizedUser && autorizedUser.token
        if(token){localStorage.setItem('token', token);}
    },[data])

    
    const validationSchema = yup.object({
        login: yup
            .string()
            .matches(/^([^0-9]*)$/, "Name should not contain numbers")
            .required()
            .min(2),
        email: yup
            .string()
            .email()
            .required(),
        password: yup
            .string()
            .required()
            .min(8)
            .max(30),
        repeatPassword: yup
            .string().oneOf([yup.ref('password')], "Password mismatch")
            .required()
            .min(8)
            .max(30),
        avatar: yup
            .string()
            .notRequired()
            .url('Please enter correct url')
    })
    
    const formikConfig: FormikConfig<RegistrationUserCredentials> = {
        enableReinitialize: false,
        initialValues: {
            login: '',
            password: '',
            repeatPassword: '',
            email: '',
            avatar: ''
        },
        onSubmit: (values) => {
            const message = JSON.stringify(values, null, 2);
            registrationUser(
                {
                    variables: values,
                }
            );
            alert(message);
            setRegistrationFormValues(values);
        },
        validationSchema,
    };
    
    const formik = useFormik<RegistrationUserCredentials>(formikConfig);
    
    if (context === null) {
        return null;
    }
    const {setRegistrationFormValues} = context;
  
    return (
        <div className={style.wrap}>
            <div className={style.wrapForm}>
                <div className={style.headerForm}>Registration</div>
                <form noValidate onSubmit={formik.handleSubmit}>
                    <Input
                        type={"text"}
                        id={"form-login-input"}
                        autoComplete={"off"}
                        inputError={formik.errors.login}
                        touched={formik.touched.login}
                        {...formik.getFieldProps('login')}
                    />
                    <Input
                        type={"text"}
                        id={"form-email-input"}
                        autoComplete={"off"}
                        inputError={formik.errors.email}
                        touched={formik.touched.email}
                        {...formik.getFieldProps('email')}
                    />
                    <Input
                        type={"password"}
                        id={"form-password-input"}
                        autoComplete={"off"}
                        inputError={formik.errors.password}
                        touched={formik.touched.password}
                        {...formik.getFieldProps('password')}
                    />
            
                    <Input
                        type={"password"}
                        id={"form-repeatPassword-input"}
                        autoComplete={"off"}
                        inputError={formik.errors.repeatPassword}
                        touched={formik.touched.repeatPassword}
                        {...formik.getFieldProps('repeatPassword')}
                    />
                    <AvatarInput
                        inputProps={{
                            type: "text",
                            id: "form-avatar-input",
                            autoComplete: 'off',
                            inputError: formik.errors.avatar,
                            touched: formik.touched.avatar,
                            ...formik.getFieldProps('avatar')
                        }}
                        avatarProps={{
                            avatar: formik.getFieldProps('avatar').value,
                            nameAvatar: formik.getFieldProps('login').value,
                            sizeAvatar: "large"
                        }}
                    />
                    <div className={style.button}>
                        <Button type={"submit"} color={"primary"}  size={'small'}
                                disabled={!(formik.isValid && formik.dirty && !loading)}> {loading ? "Loading..." : "Register"}
                        </Button>
                    </div>
                    <div className={style.errorMessage}> {error? error.graphQLErrors[0].message : null}</div>
                </form>
                
            </div>
        </div>
    )
}

export default Registration;
