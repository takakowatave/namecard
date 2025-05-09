import { TextEncoder, TextDecoder } from "util";

// 型エラーを無視して代入する
(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "../pages/Card";
import Top from "../pages/Top";
import RegisterCard from "../pages/RegisterCard";
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
  insertUser: jest.fn().mockResolvedValue({}), 
}));

// Card.tsx
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

  test("技術が表示されている", async () => {
  render(
    <MemoryRouter initialEntries={["/taro"]}>
      <Routes>
        <Route path="/:id" element={<Card />} />
      </Routes>
    </MemoryRouter>)
    const skills = await screen.findByTestId("skills");

    expect(skills).toBeInTheDocument();
  });

  test("Githubアイコンが表示されている", async () => {
    render(
      <MemoryRouter initialEntries={["/taro"]}>
        <Routes>
          <Route path="/:id" element={<Card />} />
        </Routes>
      </MemoryRouter>)
      const icon = await screen.findByAltText("GitHub");
      expect(icon).toBeInTheDocument();
    });

    test("Qiitaのアイコンが表示されている", async () => {
      render(
        <MemoryRouter initialEntries={["/taro"]}>
          <Routes>
            <Route path="/:id" element={<Card />} />
          </Routes>
        </MemoryRouter>)
        const icon = await screen.findByAltText("Qiita");
        expect(icon).toBeInTheDocument();
      });

    test("Xのアイコンが表示されている", async () => {
      render(
        <MemoryRouter initialEntries={["/taro"]}>
          <Routes>
            <Route path="/:id" element={<Card />} />
          </Routes>
        </MemoryRouter>)
        const icon = await screen.findByAltText("X");
        expect(icon).toBeInTheDocument();
      });

// Navigatorモック準備
const mockedNavigator = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigator,
}));

  test('戻るボタンをクリックすると/に遷移する', async () => {
      render(
        <MemoryRouter initialEntries={["/taro"]}>
          <Routes>
            <Route path="/:id" element={<Card />} />
          </Routes>
        </MemoryRouter>)
    // /を引数にNavigatorが呼び出されること
    const back_button = await screen.findByTestId("back_button");
    await userEvent.click(back_button);
    expect(mockedNavigator).toHaveBeenCalledWith('/');
  });

  test("戻るボタンがあること", async () => {
      render(
        <MemoryRouter initialEntries={["/taro"]}>
          <Routes>
            <Route path="/:id" element={<Card />} />
          </Routes>
        </MemoryRouter>)
      const back_button = await screen.findByTestId("back_button");
      expect(back_button).toBeInTheDocument();
  });

// RegisterCard.tsx
  test("タイトルがあること(RegisterCard)", async () => {
    render(<RegisterCard />);
    const title = screen.getByTestId("title");
    expect(title).toBeInTheDocument();
  });

test("全項目入力して登録ボタンを押すと / に遷移する", async () => {
    render(<RegisterCard />);
    // /を引数にNavigatorが呼び出されること
    const save_button = await screen.findByTestId("save_button");
    await userEvent.click(save_button);
    expect(mockedNavigator).toHaveBeenCalledWith('/');
});

test("未入力のときに、必須の3項目すべてにエラーが出る", async () => {
  render(<RegisterCard />);
  await userEvent.click(screen.getByTestId("save_button"));
  const errorMessages = await screen.findAllByText("この項目は必須です");
  expect(errorMessages).toHaveLength(3);
});


test("オプションを入力しなくても登録ができる", async () => {
  render(<RegisterCard />);
  
  //必須4項目だけを記入
  await userEvent.type(screen.getByLabelText("好きな英単語 *"), "coffee");
  await userEvent.type(screen.getByLabelText("お名前 *"), "田中太郎");
  await userEvent.type(screen.getByLabelText("自己紹介 *"), "こんにちは");
  await userEvent.selectOptions(screen.getByRole("combobox"), ["react"]);
  
  const save_button = await screen.findByTestId("save_button");
  await userEvent.click(save_button);
  expect(mockedNavigator).toHaveBeenCalledWith('/');
});

// Top.tsx
  test("タイトルがあること(Top)", async () => {
    render(
      <MemoryRouter>
        <Top />
      </MemoryRouter>
    );
    const title = screen.getByTestId("title");
    expect(title).toBeInTheDocument();
  });

  test("IDを入力してボタンを押すと/cards/:idに遷移する", async () => {
    render(
      <MemoryRouter>
        <Top />
      </MemoryRouter>
    );
    await userEvent.type(screen.getByPlaceholderText("IDを入力"), "taro");
    const search_button = await screen.findByTestId("search_button");
    await userEvent.click(search_button);
    expect(mockedNavigator).toHaveBeenCalledWith('/cards/taro');
});

  test("IDを入力しないとエラーメッセージが表示される", async () => {
    render(
      <MemoryRouter>
        <Top />
      </MemoryRouter>
    );
    const search_button = await screen.findByTestId("search_button");
    await userEvent.click(search_button);
    const errorMessages = await screen.findAllByText("この項目は必須です");
    expect(errorMessages).toHaveLength(1);
});

  test("新規登録はこちらを押すと/cards/registerに遷移する", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Top />} /> 
          <Route path="/cards/register" element={<div>名刺新規登録</div>} />
        </Routes>
      </MemoryRouter>
    );
    const register_button = await screen.findByTestId("register_button");
    await userEvent.click(register_button);
    const result = await screen.findByText("名刺新規登録");
    expect(result).toBeInTheDocument();
});
