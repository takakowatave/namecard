import CardLayout from "../components/CardLayout";
import TextAreaInput from "../components/TextAreaInput";
import SelectInput from "../components/SelectInput";
import TextInput from "../components/TextInput";
import FormLayout from "../components/FormLayout";
import { Stack, Box, Button, useToast, Text } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { insertUser, FormUser } from "../lib/user";
import { useNavigate } from "react-router-dom";

const RegisterCard = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const { register, control, handleSubmit, reset, formState: { errors } } = useForm<FormUser>(); 

    const onSubmit = async (data: FormUser) => {
        console.log("送信データ", data); // ← ① onSubmit が動いているか確認
        try { await insertUser(data);
        console.log("更新完了")
            toast({
                title: "保存しました",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top",
                });
            reset({
                word: "",
                name: "",
                bio: "",
                tech: "",
                github: "",
                qiita: "",
                x: ""
            });
            navigate("/");
            } catch (e) {
                console.error("保存失敗", e);
            }
        };
    return (
        <CardLayout title="名刺新規登録">
        <Stack spacing= {6}>
        <FormLayout title="好きな英単語 *">
        <TextInput placeholder="coffee" 
            {...register("word", {
                // 入力が空欄だった場合にエラーメッセージを出す
                required: "この項目は必須です",
                // 英数字だけを許可するルール（例：IDなどに使う）
                pattern: {
                    value: /^[a-zA-Z0-9]+$/, // 英小文字・大文字・数字のみ
                    message: "英数字のみで入力してください" // 条件に合わないときのエラーメッセージ
                },
                maxLength: {
                    value: 15,
                    message: "15文字以内で入力してください"
                    }
            }
        )}>
        </TextInput>
            {errors.word && (
              <Text color="red.500">{errors.word.message}</Text> // ← エラーメッセージの表示
            )}
        </FormLayout>

        <FormLayout title="お名前 *">
        <TextInput placeholder="名前を記入"
            {...register("name", {
                required: "この項目は必須です",
                pattern: {
                    value: /^[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}a-zA-Z0-9ー\s]+$/u, // 英小文字・大文字・数字のみ
                    message: "日本語か英数字で入力してください" // 条件に合わないときのエラーメッセージ
                },
                maxLength: {
                    value: 15,
                    message: "15文字以内で入力してください"
                    }
            }
        )}>
        </TextInput>
        {errors.name && (
              <Text color="red.500">{errors.name.message}</Text> // ← エラーメッセージの表示
            )}
        </FormLayout>

        <FormLayout title="自己紹介 *">
        <Controller
            name="bio"
            control={control}
            rules={{
                required: "この項目は必須です",
                pattern: {
                    value: /^[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}a-zA-Z0-9ー\s]+$/u,
                    message: "形式が正しくありません",
                },
                maxLength: {
                value: 25,
                message: "25文字以内で入力してください"
                }
            }}
            render={({ field }) => (
            <TextAreaInput {...field} />
            )}
        />
        {errors.bio && (
            <Text color="red.500">{errors.bio.message}</Text> // ← エラーメッセージの表示
        )}
        </FormLayout>

        <FormLayout title="好きな技術 *">
        <Controller
            name="tech"
            control={control}
            render={({ field }) => (
            <SelectInput {...field} />
            )}
        />
        {errors.tech && (
            <Text color="red.500">{errors.tech.message}</Text> // ← エラーメッセージの表示
        )}
        </FormLayout>

        <FormLayout title="GitHub ID">
        <TextInput placeholder="" 
            {...register("github", {
                pattern: {
                    value: /^[a-zA-Z0-9]+$/, // 英小文字・大文字・数字のみ
                    message: "英数字で入力してください" // 条件に合わないときのエラーメッセージ
                },
                maxLength: {
                    value: 15,
                    message: "15文字以内で入力してください"
                    }
            }
        )}></TextInput>
        {errors.github && (
            <Text color="red.500">{errors.github.message}</Text> // ← エラーメッセージの表示
        )}
        </FormLayout>

        <FormLayout title="Qiita ID">
        <TextInput placeholder="" 
            {...register("qiita", {
                pattern: {
                    value: /^[a-zA-Z0-9]+$/, // 英小文字・大文字・数字のみ
                    message: "英数字で入力してください" // 条件に合わないときのエラーメッセージ
                },
                maxLength: {
                    value: 15,
                    message: "15文字以内で入力してください"
                    }
            }
        )}></TextInput>
        {errors.qiita && (
            <Text color="red.500">{errors.qiita.message}</Text> // ← エラーメッセージの表示
        )}
        </FormLayout>

        <FormLayout title="X ID">
        <TextInput placeholder="@は不要" 
            {...register("x", {
                pattern: {
                    value: /^[a-zA-Z0-9]+$/, // 英小文字・大文字・数字のみ
                    message: "英数字で入力してください" // 条件に合わないときのエラーメッセージ
                },
                maxLength: {
                    value: 15,
                    message: "15文字以内で入力してください"
                    }
            }
        )}>
        </TextInput>
        {errors.x && (
            <Text color="red.500">{errors.x.message}</Text> // ← エラーメッセージの表示
        )}
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
            <Button 
                w="100%" 
                variant="outline" 
                color="teal" borderColor="teal" 
                onClick={() => navigate("/")}>戻る 
            </Button>
        </Box>
        </CardLayout>
    );
};

export default RegisterCard;
