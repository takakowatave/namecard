import CardLayout from "../components/CardLayout";
import TextAreaInput from "../components/TextAreaInput";
import SelectInput from "../components/SelectInput";
import TextInput from "../components/TextInput";
import FormLayout from "../components/FormLayout";
import { Stack, Heading, Box, Button, Toast } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { insertUser, FormUser } from "../lib/user";
import { useNavigate } from "react-router-dom";
// 1. データを取得
// → useForm() で値を管理し、handleSubmit(onSubmit) でデータが取れる。

// 2. クリックでバリデーション発火
// → ボタンに onClick={handleSubmit(onSubmit)} をつけると、バリデーションが通ったときだけ送信処理に進む。

// 3. データを Supabase に送信
// → onSubmit 関数の中で supabase.from("テーブル名").insert(data) を実行。



const RegisterCard = () => {
    const navigate = useNavigate();
    const { register, control, handleSubmit } = useForm<FormUser>(); 
    const onSubmit = async (data: FormUser) => {
        await insertUser(data);
        console.log("更新完了")
            Toast({
                title: "保存しました",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        };
    return (
        <CardLayout>
        <Heading py= {4} textAlign="center" w="100%">名刺新規登録</Heading>
        <Stack spacing= {6}>
        <FormLayout title="好きな英単語">
        <TextInput placeholder="coffee" {...register("word")}></TextInput>
        </FormLayout>

        <FormLayout title="お名前">
        <TextInput placeholder="名前を記入" {...register("name")}></TextInput>
        </FormLayout>

        <FormLayout title="自己紹介">
        <Controller
            name="bio"
            control={control}
            render={({ field }) => (
            <TextAreaInput {...field} />
            )}
        />
        </FormLayout>

        <FormLayout title="好きな技術">
        <Controller
            name="tech"
            control={control}
            render={({ field }) => (
            <SelectInput {...field} />
            )}
        />
        </FormLayout>

        <FormLayout title="GitHub ID">
        <TextInput placeholder="" {...register("github")}></TextInput>
        </FormLayout>

        <FormLayout title="Qiita ID">
        <TextInput placeholder="" {...register("qiita")}></TextInput>
        </FormLayout>

        <FormLayout title="X ID">
        <TextInput placeholder="@は不要" {...register("x")}></TextInput>
        </FormLayout>
        </Stack>
        <Box>
            <Button 
                onClick={handleSubmit(onSubmit)}
                data-testid="save_button" 
                type="submit" 
                colorScheme="teal" 
                w="100%" 
                my="4">保存
            </Button>
            <Button w="100%" variant="outline" color="teal" borderColor="teal" onClick={() => navigate("/")}>戻る </Button>
        </Box>
        </CardLayout>
    );
};


export default RegisterCard;
