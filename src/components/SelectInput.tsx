import { FormControl, Select } from "@chakra-ui/react";
import FormTitle from "./FormTitle";

const SelectInput = () => {
    return (
        <FormControl>
        <FormTitle>好きな技術</FormTitle>
        <Select placeholder="選んでください">
            <option value="react">React</option>
            <option value="next">Next.js</option>
            <option value="chakra">Chakra UI</option>
        </Select>
        </FormControl>
    );
};

export default SelectInput; 
