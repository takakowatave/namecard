import { FormControl, Input } from "@chakra-ui/react";
import FormTitle from "./FormTitle";

const TextInput = () => {
    return (
        <FormControl>
        <FormTitle>好きな英単語</FormTitle>
        <Input placeholder="coffee" />
        </FormControl>
    );
};
export default TextInput;
