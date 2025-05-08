import { TextEncoder, TextDecoder } from "util";

// 型エラーを無視して代入する
(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "../pages/Card";
import { MemoryRouter, Routes, Route } from "react-router-dom";
jest.mock("../utils/supabaseClient", () => ({}));

jest.mock("../lib/user", () => ({
  ...jest.requireActual("../lib/user"),
  fetchUserAndSkills: jest.fn().mockResolvedValue({
    user: {
      id: "taro",
      name: "太郎",
      description: "こんにちは",
      github_id: "taro-github",
      qiita_id: "taro-qiita",
      x_id: "taro-x",
      created_at: "...",
    },
    skills: [
      { id: "1", skill_name: "React" },
      { id: "2", skill_name: "TypeScript" },
    ],
  }),
}));


  test("名前があること", async () => {
  render(
    <MemoryRouter initialEntries={["/taro"]}>
      <Routes>
        <Route path="/:id" element={<Card />} />
      </Routes>
    </MemoryRouter>)
    const name = await screen.findByTestId("name");

    expect(name).toBeInTheDocument();
  });
