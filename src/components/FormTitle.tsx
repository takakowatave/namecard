import { FormLabel } from "@chakra-ui/react";

type FormTitleProps = {         // titleという文字列型のprops
    children: React.ReactNode; // childrenという中身（React要素）を受け取るprops
    };

const FormTitle = ({ children }: FormTitleProps) => {
    return (
        <FormLabel>{children}</FormLabel>
    );
};
export default FormTitle;
