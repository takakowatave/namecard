import CardLayout from "../components/CardLayout";
import { Heading } from "@chakra-ui/react";
import TextAreaInput from "../components/TextAreaInput";
import SelectInput from "../components/SelectInput";
import TextInput from "../components/TextInput";
import FormLayout from "../components/FormLayout";
import { Stack } from "@chakra-ui/react";

const RegisterCard = () => {
    return (
        <CardLayout>
        <Heading py= {4} textAlign="center" w="100%">名刺新規登録</Heading>
        <Stack spacing= {6}>
        <FormLayout title="好きな英単語">
        <TextInput placeholder="名前を入力"></TextInput>
        </FormLayout>

        <FormLayout title="自己紹介">
        <TextAreaInput></TextAreaInput>
        </FormLayout>

        <FormLayout title="好きな技術">
        <SelectInput></SelectInput>
        </FormLayout>

        <FormLayout title="GitHub ID">
        <TextInput placeholder="名前を入力"></TextInput>
        </FormLayout>

        <FormLayout title="Qiita ID">
        <TextInput placeholder="名前を入力"></TextInput>
        </FormLayout>

        </Stack>
        </CardLayout>
    );
};


export default RegisterCard;
