import React, { useState } from "react";
import axios from "axios";
import InputMask from 'react-input-mask';
import { Link } from "react-router-dom";
import { Button, Container, Divider, Form, Icon, FormSelect, FormRadio } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

const options = [
    { key: 'AL', value: 'Al', text: 'Alagoas' },
    { key: 'BA', value: 'BA', text: 'Bahia' },
    { key: 'CE', value: 'CE', text: 'Ceará' },
    { key: 'MA', value: 'MA', text: 'Maranhão' },
    { key: 'PB', value: 'PB', text: 'Paraíba' },
    { key: 'PE', value: 'PE', text: 'Pernambuco' },
    { key: 'PI', value: 'PI', text: 'Piauí' },
    { key: 'RN', value: 'RN', text: 'Rio Grande do Norte' },
    { key: 'SE', value: 'SE', text: 'Sergipe' },
]

export default function FormEntregador() {

    const [nome, setNome] = useState();
    const [cpf, setCpf] = useState();
    const [rg, setRg] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [foneCelular, setFoneCelular] = useState();
    const [foneFixo, setFoneFixo] = useState();
    const [qtdEntregasRealizadas, setQtdEntregasRealizadas] = useState();
    const [valorFrete, setValorFrete] = useState();
    const [enderecoRua, setEnderecoRua] = useState();
    const [enderecoNumero, setEnderecoNumero] = useState();
    const [enderecoBairro, setEnderecoBairro] = useState();
    const [enderecoCidade, setEnderecoCidade] = useState();
    const [enderecoCep, setEnderecoCep] = useState();
    const [enderecoUf, setEnderecoUf] = useState();
    const [enderecoComplemento, setEnderecoComplemento] = useState();
    const [ativo, setAtivo] = useState(true);

    function salvar() {

        let entregadorRequest = {
            nome: nome,
            cpf: cpf,
            rg: rg,
            dataNascimento: dataNascimento,
            foneCelular: foneCelular,
            foneFixo: foneFixo,
            qtdEntregasRealizadas: qtdEntregasRealizadas,
            valorFrete: valorFrete,
            enderecoRua: enderecoRua,
            enderecoNumero: enderecoNumero,
            enderecoBairro: enderecoBairro,
            enderecoCidade: enderecoCidade,
            enderecoCep: enderecoCep,
            enderecoUf: enderecoUf,
            enderecoComplemento: enderecoComplemento,
            ativo: ativo
        }

        axios.post("http://localhost:8080/api/entregador", entregadorRequest)
            .then((response) => {
                console.log('Entregador cadastrado com sucesso.')
            })
            .catch((error) => {
                console.log('Erro ao incluir um entregador.')
            })
    }

    return (
        <div>

            <MenuSistema tela={'entregador'} />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> <span style={{ color: 'darkgray' }}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group>

                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    maxLength="150"
                                    width={12}
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='CPF'
                                    width={8}
                                >
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                        value={cpf}
                                        onChange={e => setCpf(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='RG'
                                    width={8}
                                    value={rg}
                                    onChange={e => setRg(e.target.value)}
                                />

                            </Form.Group>

                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='DT Nascimento'
                                    width={3}>

                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        value={dataNascimento}
                                        onChange={e => setDataNascimento(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    required
                                    label='Fone Celular'
                                    width={8}>
                                    <InputMask
                                        mask="(99) 9999.9999"
                                        value={foneCelular}
                                        onChange={e => setFoneCelular(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Fone Fixo'
                                    width={8}>
                                    <InputMask
                                        mask="(99) 9999.9999"
                                        value={foneFixo}
                                        onChange={e => setFoneFixo(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='QTD Entregas Realizadas'
                                    width={6}
                                    value={qtdEntregasRealizadas}
                                    onChange={e => setQtdEntregasRealizadas(e.target.value)}>
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Valor por Frete'
                                    width={6}
                                    value={valorFrete}
                                    onChange={e => setValorFrete(e.target.value)}
                                />

                            </Form.Group>

                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Rua'
                                    width={15}
                                    value={enderecoRua}
                                    onChange={e => setEnderecoRua(e.target.value)}
                                />

                                <Form.Input
                                    fluid
                                    label='Número'
                                    width={4}
                                    value={enderecoNumero}
                                    onChange={e => setEnderecoNumero(e.target.value)}
                                />

                            </Form.Group>

                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Bairro'
                                    width={11}
                                    value={enderecoBairro}
                                    onChange={e => setEnderecoBairro(e.target.value)}
                                />

                                <Form.Input
                                    fluid
                                    label='Cidade'
                                    width={11}
                                    value={enderecoCidade}
                                    onChange={e => setEnderecoCidade(e.target.value)}
                                />

                                <Form.Input
                                    fluid
                                    label='CEP'
                                    width={3}
                                    value={enderecoCep}
                                    onChange={e => setEnderecoCep(e.target.value)}
                                />

                            </Form.Group>

                            <FormSelect
                                fluid
                                label='UF'
                                options={options}
                                placeholder='Selecione'
                                value={enderecoUf}
                                onChange={(e,{value}) => setEnderecoUf(value)}

                            />

                            <Form.Input
                                fluid
                                label='Complemento'
                                value={enderecoComplemento}
                                onChange={e => setEnderecoComplemento(e.target.value)}
                            />

                            <Form.Group inline>
                                <span>Ativo: </span>
                                <Form.Radio
                                    fluid
                                    label='Sim'
                                    value={ativo}
                                    onChange={e => setAtivo(true)}
                                />
                                <Form.Radio
                                    fluid
                                    label='Não'
                                    checked={!ativo}
                                    onChange={e => setAtivo(false)}
                                />
                            </Form.Group>

                        </Form>

                        <div style={{ marginTop: '4%' }}>

                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                                textColo
                            >
                                <Icon name='reply' />
                                <Link to={'/list-entregador'}>Voltar</Link>
                            </Button>

                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={() => salvar()}
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>

                        </div>

                    </div>

                </Container>
            </div>
        </div>

    );

}
