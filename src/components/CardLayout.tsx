// CardLayout.tsx
import React from 'react'; // React本体を読み込む

type CardLayoutProps = {
  title: string;            // titleという文字列型のprops
  children: React.ReactNode; // childrenという中身（React要素）を受け取るprops
};

const CardLayout = ({ title, children }: CardLayoutProps) => { // propsを受け取るコンポーネントを定義
    return (
        <div> {/* カード全体の枠になるdiv */}
        <h1>{title}</h1> {/* propsでもらったタイトルを表示 */}
        {children}       {/* 中身（フォームやテキストなど）を表示 */}
        </div>
    );
};

export default CardLayout; // このコポーネントを外部でも使えるようにする
