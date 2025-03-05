import { Customer } from "@/api/Api";
import { useEffect, useState } from "react";
import { GridItem, Grid, HStack, Stack, Text, createListCollection } from '@chakra-ui/react';
import { Avatar } from "@chakra-ui/react";
import useApi from "@/hooks/useApi";
import {
    SelectContent,
    SelectItem,
    SelectItemGroup,
    SelectLabel,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from "@/components/ui/select"

export function IndexPage() {
    const api = useApi();
    const [users, setUsers] = useState<Customer[]>([]);

    useEffect(() => {
        const dataFetch = async () => {
            const tmp = await api.getCustomers();
            setUsers(tmp);
        }
        dataFetch();
    }, []);

    const frameworks = createListCollection({
        items: [
            { label: "Naruto", value: "naruto", group: "Anime" },
            { label: "One Piece", value: "one-piece", group: "Anime" },
            { label: "Dragon Ball", value: "dragon-ball", group: "Anime" },
            {
                label: "The Shawshank Redemption",
                value: "the-shawshank-redemption",
                group: "Movies",
            },
            { label: "The Godfather", value: "the-godfather", group: "Movies" },
            { label: "The Dark Knight", value: "the-dark-knight", group: "Movies" },
        ],
    });

    const categories = frameworks.items.reduce(
        (acc, item) => {
            const group = acc.find((group) => group.group === item.group)
            if (group) {
                group.items.push(item)
            } else {
                acc.push({ group: item.group, items: [item] })
            }
            return acc
        },
        [] as { group: string; items: (typeof frameworks)["items"] }[],
    );

    return <>
        <Grid>
            <GridItem>
                <Stack gap="8">
                    {users.map((e, i) => (
                        <HStack key={i} gap="4">
                            <Avatar.Root>
                                <Avatar.Fallback name={e.contactFirstName} />
                                <Avatar.Image src={""} />
                            </Avatar.Root>
                            <Stack gap="0">
                                <Text fontWeight="medium">{e.contactFirstName}</Text>
                                <Text color="fg.muted" textStyle="sm">
                                    {e.phone}
                                </Text>
                            </Stack>
                        </HStack>
                    ))}
                </Stack>
            </GridItem>
            <GridItem>
                <SelectRoot collection={frameworks} size="sm" width="320px">
                    <SelectLabel>Select framework</SelectLabel>
                    <SelectTrigger>
                        <SelectValueText placeholder="Select movie" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((e) => (
                            <SelectItemGroup key={e.group} label={e.group}>
                                {e.items.map((item) => (
                                    <SelectItem item={item} key={item.value}>
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </SelectItemGroup>
                        ))}
                    </SelectContent>
                </SelectRoot>
            </GridItem>
        </Grid>
    </>;
}