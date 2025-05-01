import { Textarea } from "@chakra-ui/react";

type Props = {
    placeholder?: string; // ← ? をつけると任意になる
    };

const TextAreaInput = ({ placeholder }: Props) => {
    return (
        <Textarea placeholder={placeholder} />
    );
};
export default TextAreaInput;
