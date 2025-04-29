import CardLayout from "../components/CardLayout";
import UserForm from "../components/UserForm";

import { Heading } from "@chakra-ui/react";

const RegisterCard = () => {
    return (
        <CardLayout>
        <Heading py= {4} textAlign="center" w="100%">名刺新規登録</Heading>
            <UserForm></UserForm>            
        </CardLayout>
    );
}

export default RegisterCard;
