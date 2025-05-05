import { Input } from "@chakra-ui/react";
import { forwardRef } from "react";

const TextInput = forwardRef((props: any, ref) => {
    return <Input ref={ref} {...props} />;
});

export default TextInput;
