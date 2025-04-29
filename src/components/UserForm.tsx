
import TextAreaInput from "./TextAreaInput";
import SelectInput from "./SelectInput";
import TextInput from "./TextInput";
import { Stack } from "@chakra-ui/react";

const UserForm = () => {
    return (
        <Stack spacing= {6}>
        <TextInput></TextInput>
        <TextAreaInput></TextAreaInput>
        <SelectInput></SelectInput>
        </Stack>
    );
};

export default UserForm;



