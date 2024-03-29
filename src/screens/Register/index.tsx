import React, { useState } from "react";
import {
    Keyboard,
    Modal,
    TouchableWithoutFeedback,
    Alert
} from "react-native";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from "react-hook-form";

import { InputForm } from "../../components/Form/InputForm";
import { Button } from "../../components/Form/Button";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { CategorySelect } from "../CategorySelect";

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes
} from "./style";

interface FomData {
    name: string;
    amount: string;
}

const schema = Yup.object().shape({
    name: Yup.
        string().
        required('Nome é obrigatório'),
    amount: Yup
        .number()
        .typeError('Informe um valor númerico')
        .positive('O valor não pode ser negativo')
        .required('O Valor é obrigatório')
        
})

export function Register() {

    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setcategoryModalOpen] = useState(false);

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria'
    });

    const {
        control,
        handleSubmit,
        formState: { errors }

    } = useForm({
        resolver: yupResolver(schema)
    });

    function handleTransactionsTypeSelect(type: 'up' | 'down') {
        setTransactionType(type);
    }

    function handleOpenSelectCategoryModal() {
        setcategoryModalOpen(true);
    }


    function handleCloseSelectCategoryModal() {
        console.log('dsa');
        
        setcategoryModalOpen(false);
    }

    function handleRegister(form: FomData) {

        if (!transactionType)
            return Alert.alert('Selecione um tipo');

        if (category.key === 'category')
            return Alert.alert('Selecione a categoria');

        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key
        }

        console.log(data);

    }

    return (

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>
                        Cadastro
                    </Title>
                </Header>
                <Form>
                    <Fields>

                        <InputForm
                            name="name"
                            control={control}
                            placeholder="Nome"
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />

                        <InputForm
                            name="amount"
                            control={control}
                            placeholder="Preço"
                            keyboardType="numeric"
                            error={errors.amount && errors.amount.message}
                        />
                        <TransactionTypes>

                            <TransactionTypeButton
                                type="up"
                                title={'Income'}
                                onPress={() => handleTransactionsTypeSelect('up')}
                                isActive={transactionType === 'up'}
                            />
                            <TransactionTypeButton
                                type="down"
                                title={'Outcome'}
                                onPress={() => handleTransactionsTypeSelect('down')}
                                isActive={transactionType === 'down'}
                            />
                        </TransactionTypes>

                        <CategorySelectButton
                            title={category.name}
                            onPress={handleOpenSelectCategoryModal}
                        />

                    </Fields>

                    <Button
                        title="Enviar"
                        onPress={handleSubmit(handleRegister)}
                    />
                </Form>
                <Modal visible={categoryModalOpen}>
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSelectCategoryModal}
                        onPress={handleCloseSelectCategoryModal}
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>

    );
}