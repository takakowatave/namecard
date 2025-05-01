import { Select } from "@chakra-ui/react";

const SelectInput = () => {
    return (
        <Select placeholder="選んでください">
            <option value="react">React</option>
            <option value="next">Next.js</option>
            <option value="chakra">Chakra UI</option>
        </Select>
    );
};

export default SelectInput; 
