// src/hooks/useFetchUser.ts
//Reactに強く依存している「state管理」をコンポーネントから切り離す

import { useState, useEffect } from 'react';
import { User, Skill, fetchUserAndSkills } from '../lib/user';


export const useFetchUser = (id: string | undefined) => { //user, skillsからそれぞれpropsを受け取る
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [skills, setSkills] = useState<Skill[]>([]);
    const snsLinks = [
        { label: "GitHub", url: `https://github.com/${user?.github_id}`,icon: "/github.png" }, //labelは画面に見えるテキスト
        { label: "Qiita", url: `https://qiita.com/${user?.qiita_id}`,icon: "/qiita.png" },
        { label: "X", url: `https://x.com/${user?.x_id}`,icon: "/x.png" },
        ];

    useEffect (() => {
        const fetchData = async () => {
        try {
            if (!id) return 
            const {user, skills} = await fetchUserAndSkills(id); //supabaseからuserとskillを抜き出す
            setUser(user);
            setSkills(skills);
            setIsLoading(false); 
        }
        catch (error) {
            setError(true);
            setIsLoading(false); 
        }
        }
    fetchData();
    }, [id]);

    return { user, skills, isLoading, error, snsLinks };
};


export default useFetchUser;