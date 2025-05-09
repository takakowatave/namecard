import { useParams, useNavigate } from "react-router-dom";
import { HStack, Stack, Text, Button, List, ListItem, Link } from "@chakra-ui/react";
import { useFetchUser } from "../hooks/useFetchUser";
import CardLayout from "../components/CardLayout";

// Card関数を作る
const Card = () => { //user, skillsからそれぞれpropsを受け取る
    const { id } = useParams<{ id: string }>(); // id = "sample-id"
    const { user, skills, snsLinks } = useFetchUser(id);
    const navigate = useNavigate();

    return (
        <CardLayout title="テスト太郎">
        {user && ( //user が null じゃなければ、 <Stack> を表示
        <Stack spacing={4}>
            <Text data-testid="name">{user.name}</Text>
            <div data-testid="description" dangerouslySetInnerHTML={{ __html: user.description }} />
            <List data-testid="skills" spacing={3}>
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
        <Button data-testid="back_button" color="white" bg="teal.500" onClick={() => navigate("/")}>戻る </Button>
        </Stack>
        )}
        </ CardLayout>
    );
};


export default Card;

