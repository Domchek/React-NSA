import { Customer } from "@/api/Api";
import { useEffect, useState } from "react";
import { GridItem, Grid, HStack } from '@chakra-ui/react';
import { Avatar } from "@chakra-ui/react";
import useApi from "@/hooks/useApi";

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

    return <>
        <Grid>
            <GridItem>
                <HStack gap="4">
                    {users.map(e =>
                        <Avatar.Root shape="rounded" size="lg">
                            <Avatar.Fallback name={e.customerName} />
                            <Avatar.Image src="https://bit.ly/sage-adebayo" />
                        </Avatar.Root>
                    )}
                </HStack>
            </GridItem>
        </Grid>
    </>;
}