import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { supabase } from "../utils/supabaseClient";
import { HStack, Stack, Heading, Text, Button, List, ListItem, Link, Flex, Box } from "@chakra-ui/react";

type Skill = {
    id: string;
    skill_name: string;
}

type User = {
    id: string;
    created_at: string;
    x_id: string;
    qiita_id: string;
    github_id: string;
    description: string;
    name: string;
}

type UserWithLinks = User & {
    github_url?: string; 
    qiita_url?: string;
    x_url?: string;
}

// Card関数を作る
const Card = () => { //user, skillsからそれぞれpropsを受け取る
    const [user, setUser] = useState<User | null>(null); //「User型 or null型」、初期値は (null)
    const [skills, setSkills] = useState<Skill[]>([]); //Skill型の配列をstateに持ち、最初はからの配列でスタートする
    const { id } = useParams<{ id: string }>(); // id = "sample-id"
    const snsLinks = [
    { label: "GitHub", url: `https://github.com/${user?.github_id}`,icon: "/github.png" }, //labelは画面に見えるテキスト
    { label: "Qiita", url: `https://qiita.com/${user?.qiita_id}`,icon: "/qiita.png" },
    { label: "X", url: `https://x.com/${user?.x_id}`,icon: "/x.png" },
    ];
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

// ファクトリーメソッド
    const createUserWithLinks = (user: User): UserWithLinks => {
    return {
        ...user, // もとのuserオブジェクトの中身（id, name, github_idなど）をすべて展開する
        
        //user.github_idが存在するならGitHubのURLを作る、なければundefinedにする
        github_url: user.github_id ? `https://github.com/${user.github_id}` : undefined,
        qiita_url: user.qiita_id ? `https://qiita.com/${user.qiita_id}` : undefined,
        x_url: user.x_id ? `https://x.com/${user.x_id}` : undefined,
        }
    }
    
    useEffect(() => {
        const fetchData = async () => {
        // userテーブルの中からidが一致するものを一つだけ選ぶ
        const userResult = await supabase.from("users").select("*").eq("id", id).single();
        const { data: userData, error: userError } = userResult; //取得した結果をdataとエラーに分ける

        // skillsテーブルの中からidが一致するものを一つだけ選ぶ
        const skillsResult = await supabase.from("user_skills").select("*").eq("user_id", id);
        const { data: skillData, error: skillError } = skillsResult; //取得した結果をdataとエラーに分ける
        
          //エラーの処理
        if (userError || skillError) {
            
            return;
        }
        
        setUser(createUserWithLinks(userData)); //取得したデータをuserに保存する
        setSkills(skillData); //取得したスキルデータをskillsに保存する
        setIsLoading(false);
    } 
    fetchData(); //作った関数を実行
    }, [id]); //第二引数にidを指定（idが変わったときだけuseEffectを再実行する）

    //loadingの処理
    if (isLoading) {
    return(
    <Flex justify="center" align="center" height="100vh">
    <Text fontSize="xl">loading...</Text>
    </Flex>
    );
    }
    return (
    <Flex bg="gray.100" justifyContent="center" alignItems="center" width="100%" py= {4} height = "100%">
        <Box p= {4} bg="white" w="90%">
        <Heading py= {4} textAlign="center" w="100%">テスト太郎</Heading>
        {user && ( //user が null じゃなければ、 <Stack> を表示
        <Stack spacing={4}>
            <Text>{user.name}</Text>
            <div dangerouslySetInnerHTML={{ __html: user.description }} />
            <List spacing={3}>
                {skills.map((skill) => (
                <ListItem key={skill.id}>
                    {skill.skill_name}
                </ListItem>
                ))}
            </List>
            <HStack spacing={3}>
                {snsLinks.map((link) => (
                <Link href={link.url} isExternal key={link.label}>
                <img src={link.icon} alt={link.label} width="24" height="24" />
                </Link>
                ))}
            </HStack>
        <Button color="white" bg="teal.500" onClick={() => navigate("/")}>戻る </Button>
        </Stack>
        )}
        </Box>
    </Flex>
    );
};


//③ ユーザー情報を表示する
//④ スキルリストを表示する
//⑤ SNSアイコンを表示する
//⑥ 「戻る」ボタンを置く

export default Card;
