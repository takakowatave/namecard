import { FormControl, Textarea } from "@chakra-ui/react";
import FormTitle from "./FormTitle";

const TextAreaInput = () => {
    return (
        <FormControl>
        <FormTitle>自己紹介</FormTitle>
        <Textarea placeholder="ここに入力..." />
        </FormControl>
    );
};
export default TextAreaInput;
