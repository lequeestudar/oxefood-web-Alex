import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Form, Icon, FormTextArea, FormGroup, FormInput } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function FormProduto() {

    const [titulo, setTitulo] = useState();
    const [codigo, setCodigo] = useState();
    const [valorUnitario, setValorUnitario] = useState();
    const [tempoEntregaMinimo, setTempoEntregaMinimo] = useState();
    const [tempoEntregaMaximo, setTempoEntregaMaximo] = useState();

    function salvar() {

        let produtoRequest = {
            titulo: titulo,
            codigo: codigo,
            valorUnitario: valorUnitario,
            tempoEntregaMinimo: tempoEntregaMinimo,
            tempoEntregaMaximo: tempoEntregaMaximo
        }

        axios.post("http://localhost:8080/api/produto", produtoRequest)
            .then((response) => {
                console.log('Produto cadastrado com sucesso')
            })
            .catch((erro) => {
                console.log('Erro ao incluir o produto')
            })
    }

    return (
        <div>

            <MenuSistema tela={'produto'} />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> <span style={{ color: 'darkgray' }}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Titulo'
                                    placeholder='Informe o titulo do produto'
                                    maxLength="100"
                                    value={titulo}
                                    onChange={e => setTitulo(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='Código do Produto'
                                    placeholder='Informe o código do produto'
                                    maxLength="100"
                                    value={codigo}
                                    onChange={e => setCodigo(e.target.value)}
                                />

                            </Form.Group>

                            <FormTextArea label='Descrição' placeholder='Informe a descrição do produto' />

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Valor unitário'
                                    maxLength="100"
                                    value={valorUnitario}
                                    onChange={e => setValorUnitario(e.target.value)}
                                />

                                <Form.Input
                                    fluid
                                    label='Tempo de Entrega Minimo em Minutos'
                                    placeholder='30'
                                    maxLength="100"
                                    value={tempoEntregaMinimo}
                                    onChange={e => setTempoEntregaMinimo(e.target.value)}
                                />

                                <Form.Input
                                    fluid
                                    label='Tempo de Entrega Máximo em Minutos'
                                    placeholder='40'
                                    maxLength="100"
                                    value={tempoEntregaMaximo}
                                    onChange={e => setTempoEntregaMaximo(e.target.value)}
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
                            >
                                <Icon name='reply' />
                                <Link to={'/list-produto'}>Voltar</Link>
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