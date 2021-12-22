import React from 'react';
import { HighLightCard } from '../../components/HightLightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HighLightCards,
    Transactions,
    Title,
    TransactionList
} from './styles';


export interface DataListProps extends TransactionCardProps {
    id: string;
}

export function Dashboard() {
 
    const data: DataListProps[] = [
        {
            id: '1',
            type: 'positive',
            title: "Desenvolvimento de Site",
            amount: "R$ 122.000,00",
            category: {
                
                name: 'Vendas',
                icon: 'dollar-sign'
            },
            date: "13/04/2020"
        },
        {
            id: '2',
            type: 'negative',
            title: "Hambuergueria Pizzy",
            amount: "R$ 59,00",
            category: {

                name: 'Alimentação',
                icon: 'coffee'
            },
            date: "10/04/2020"
        },
        {
            id: '3',
            type: 'negative',
            title: "Aluguel do apartamento",
            amount: "R$ 12.000,00",
            category: {

                name: 'Casa',
                icon: 'shopping-bag'
            },
            date: "10/04/2020"
        }
    ];
    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/36752828?v=4' }} />
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Rodrigo</UserName>
                        </User>
                    </UserInfo>
                    <Icon name="power" />
                </UserWrapper>
            </Header>
            <HighLightCards>
                <HighLightCard
                    type='up'
                    title="Entrada"
                    amount="R$ 4,20"
                    lastTransaction='Última transação 13 de abril' />

                <HighLightCard
                    type='down'
                    title="Saídas"
                    amount="R$ 1.200,00"
                    lastTransaction='Última transação 03 de abril'
                />
                <HighLightCard
                    type='total'
                    title="Total"
                    amount="SALDO É VEM NO 69"
                    lastTransaction='Última transação 01 à 16 de abril'
                />
            </HighLightCards>

            <Transactions>
                <Title>Listagem</Title>

                <TransactionList
                    data={data}
                    keyExtractor={(item: { id: any; }) => item.id}
                    renderItem={({ item }) => <TransactionCard data={item} />
                    
                    }
                />


            </Transactions>
        </Container>
    )
}