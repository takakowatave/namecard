// /lib/user.ts
import { supabase } from "../utils/supabaseClient";

export type Skill = {
    id: string;
    skill_name: string;
};

export type User = {
    id: string;
    created_at: string;
    x_id: string;
    qiita_id: string;
    github_id: string;
    description: string;
    name: string;
};

export type FormUser = {
    word: string;
    name: string;
    bio: string;
    tech: string;
    github: string;
    qiita: string;
    x: string;
};


export type UserWithLinks = User & {
    github_url?: string;
    qiita_url?: string;
    x_url?: string;
};

// Supabaseから取得する生データ
export const fetchUserAndSkills = async (id: string): Promise<{ user: UserWithLinks, skills: Skill[] }> => {
    const createUserWithLinks = (user: User): UserWithLinks => {
        return {
            ...user,
            github_url: user.github_id ? `https://github.com/${user.github_id}` : undefined,
            qiita_url: user.qiita_id ? `https://qiita.com/${user.qiita_id}` : undefined,
            x_url: user.x_id ? `https://x.com/${user.x_id}` : undefined,
        };
    };

    const userResult = await supabase.from("users").select("*").eq("id", id).single();
    const { data: userData, error: userError } = userResult;

    const skillsResult = await supabase.from("user_skills").select("*").eq("user_id", id);
    const { data: skillData, error: skillError } = skillsResult;

    if (userError || skillError) {
        throw new Error("データ取得に失敗しました");
    }

    const user = createUserWithLinks(userData);
    const skills = skillData;
    return { user, skills };
};

// 登録処理
export type InsertUserResponse = {
    data: User[] | null;
    error: Error | null;
};

export const insertUser = async (formData: FormUser): Promise<InsertUserResponse> => {
    const newUser: User = {
        id: formData.word, 
        name: formData.name,
        description: formData.bio,
        github_id: formData.github,
        qiita_id: formData.qiita,
        x_id: formData.x,
        created_at: new Date().toISOString(),
    };
    console.log("送信データ:", newUser);
    const result = await supabase.from("users").insert([newUser]);
    const { data, error } = result;
    return { data, error };
};