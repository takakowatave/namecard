import CardLayout from "../components/CardLayout";
import FormLayout from "../components/FormLayout";
import TextInput from "../components/TextInput";
import { Stack, Button, Text, Flex } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FormUser } from "../lib/user";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Top = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<FormUser>();

    const onSubmit = ({ word }: FormUser) => {
        navigate(`/cards/${word}`);
    };

    return (
        <CardLayout title="デジタル名刺アプリ">
        <Stack spacing={6}>
            <FormLayout title="ID">
            <TextInput
                placeholder="IDを入力"
                {...register("word", {
                required: "この項目は必須です",
                pattern: {
                    value: /^[a-zA-Z0-9]+$/,
                    message: "英数字のみで入力してください",
                },
                maxLength: {
                    value: 15,
                    message: "15文字以内で入力してください",
                },
                })}
            />
            {errors.word && (
                <Text color="red.500">{errors.word.message}</Text>
            )}
            </FormLayout>
            <Button
            data-testid="search_button"
            onClick={handleSubmit(onSubmit)}
            colorScheme="teal"
            w="100%"
            >
            名刺をみる
            </Button>
        </Stack>
            <Flex justify="center" align="center">
            <Link  data-testid= "register_button" to="cards/register">新規登録はこちら</Link>
            </Flex>
        </CardLayout>
    );
};

export default Top;
