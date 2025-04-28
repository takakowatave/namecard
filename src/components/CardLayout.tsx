// CardLayout.tsx
import React from 'react'; // React本体を読み込む
import { Flex, Box } from "@chakra-ui/react";

type CardLayoutProps = {         // titleという文字列型のprops
  children: React.ReactNode; // childrenという中身（React要素）を受け取るprops
};

const CardLayout = ({ children }: CardLayoutProps) => { // propsを受け取るコンポーネントを定義
    return (
    <Flex bg="gray.100" justifyContent="center" alignItems="center" width="100%" py= {4} height = "100%">
        <Box p= {4} bg="white" w="90%">
            {children}
        </Box>
    </Flex>
    );
};

export default CardLayout; // このコポーネントを外部でも使えるようにする
