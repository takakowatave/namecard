import { Input } from "@chakra-ui/react";


const TextInput = ({ placeholder }: { placeholder: string }) => {
    return (
        <Input placeholder={placeholder} />
    );
};
export default TextInput;
