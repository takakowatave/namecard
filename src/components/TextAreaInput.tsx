import { Textarea } from "@chakra-ui/react";

type Props = {
    // 入力された値そのもの。Textareaに表示される文字。
    value: string;
    // 入力内容が変わったときに呼ばれる関数（RHFが中身を管理する）
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    // フォーカスが外れたときに呼ばれる関数（バリデーションタイミングなどに使われる）
    onBlur: () => void;
    // この入力の名前（フォームのデータとして管理されるキー名）
    name: string;
    // 入力欄に表示される薄い説明テキスト（未入力のとき）
    placeholder?: string;
    };


const TextAreaInput = ({ value, onChange, onBlur, name, placeholder }: Props) => {
    return (
        <Textarea
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        />
    );
};
export default TextAreaInput;


