import { FormControl } from "@chakra-ui/react";
import FormTitle from "./FormTitle";

type FormLayoutProps = {
    title: string;
    children: React.ReactNode;
    };
    
    const FormLayout = ({ title, children }: FormLayoutProps) => {
        return (
        <FormControl>
            <FormTitle>{title}</FormTitle>
            {children}
        </FormControl>
        );
    };
    

export default FormLayout; 
