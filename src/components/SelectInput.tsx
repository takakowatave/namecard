import { Select } from "@chakra-ui/react";

type Props = {
    // 入力された値そのもの。Textareaに表示される文字。
    value: string;
    // 入力内容が変わったときに呼ばれる関数（RHFが中身を管理する）
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    // フォーカスが外れたときに呼ばれる関数（バリデーションタイミングなどに使われる）
    onBlur: () => void;
    // この入力の名前（フォームのデータとして管理されるキー名）
    name: string;
    // 入力欄に表示される薄い説明テキスト（未入力のとき）
    placeholder?: string;
    };

const SelectInput = ({ value, onChange, onBlur, name, placeholder }: Props) => {
    return (
        <Select
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        >
            <option value="react">React</option>
            <option value="next">Next.js</option>
            <option value="chakra">Chakra UI</option>
        </Select>
    );
};

export default SelectInput; 



