import { useParams, useNavigate } from "react-router-dom";
import { HStack, Stack, Heading, Text, Button, List, ListItem, Link } from "@chakra-ui/react";
import { useFetchUser } from "../hooks/useFetchUser";
import CardLayout from "../components/CardLayout";

// Card関数を作る
const Card = () => { //user, skillsからそれぞれpropsを受け取る
    const { id } = useParams<{ id: string }>(); // id = "sample-id"
    const { user, skills, isLoading, error, snsLinks } = useFetchUser(id);
    const navigate = useNavigate();

    return (
        <CardLayout title="デジタル名刺アプリ">
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
        </ CardLayout>
    );
};


export default Card;

