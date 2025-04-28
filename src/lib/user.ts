// /lib/user.ts
import { supabase } from "../utils/supabaseClient";

export type Skill = {
    id: string;
    skill_name: string;
}

export type User = {
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

//supabaseから取得する生データ
//データを取りに行く・加工する」という全部の仕事を肩代わりさせる
export const fetchUserAndSkills = async (id: string): Promise<{ user: UserWithLinks, skills: Skill[] }> => {
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

        const userResult = await supabase.from("users").select("*").eq("id", id).single();
        const { data: userData, error: userError } = userResult; //取得した結果をdataとエラーに分ける

        // skillsテーブルの中からidが一致するものを一つだけ選ぶ
        const skillsResult = await supabase.from("user_skills").select("*").eq("user_id", id);
        const { data: skillData, error: skillError } = skillsResult; //取得した結果をdataとエラーに分ける
        
          //エラーの処理
        if (userError || skillError) {
            throw new Error("データ取得に失敗しました");
        }

        const user = createUserWithLinks(userData); 
        const skills = skillData;
        return{ user, skills };
};
