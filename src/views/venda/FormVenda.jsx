import React, { useEffect, useState } from "react";
import axios from "axios";
import InputMask from 'react-input-mask';
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, FormGroup, Icon, FormSelect, FormRadio } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

const options = [
    { key: 'Pedido Cancelado', value: 'pedidoCancelado', text: 'Pedido Cancelado' },
    { key: 'Aguardando Pagamento', value: 'aguardandoPagamento', text: 'Aguardando Pagamento' },
    { key: 'Pago', value: 'Pago', text: 'Pago' },
    { key: 'Entregue', value: 'Entregue', text: 'Entregue' }
]

export default function FormVenda() {

    const [cliente, setCliente] = useState();
    const [produto, setProduto] = useState();
    const [statusVenda, setStatusVenda] = useState();
    const [dataVenda, setDataVenda] = useState();
    const [valorTotal, setValorTotal] = useState();
    const [observacao, setObservacao] = useState();
    const [retiradaEmLoja, setRetiradaEmLoja] = useState(true);

    const { state } = useLocation();
    const [idVenda, setIdVenda] = useState();

    function salvar() {

        let vendaRequest = {
            cliente: cliente,
            produto: produto,
            statusVenda: statusVenda,
            dataVenda: dataVenda,
            valorTotal: valorTotal,
            observacao: observacao,
            retiradaEmLoja: retiradaEmLoja
        }

        if (idVenda != null) { //Alteração:
            axios.put("http://localhost:8080/api/venda/" + idVenda, vendaRequest)
                .then((response) => { console.log('Venda alterado com sucesso.') })
                .catch((error) => { console.log('Erro ao alter um venda.') })
        } else { //Cadastro:
            axios.post("http://localhost:8080/api/venda", vendaRequest)
                .then((response) => { console.log('Venda cadastrado com sucesso.') })
                .catch((error) => { console.log('Erro ao incluir o venda.') })
        }
    }


    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/venda/" + state.id)
                .then((response) => {
                    setIdVenda(response.data.id)
                    setCliente(response.data.cliente)
                    setProduto(response.data.produto)
                    setStatusVenda(response.data.statusVenda)
                    setDataVenda(response.data.dataVenda)
                    setValorTotal(response.data.valorTotal)
                    setObservacao(response.data.observacao)
                    setRetiradaEmLoja(response.data.retiradaEmLoja)
                })
        }
    }, [state])

    return (
        <div>

            <MenuSistema tela={'venda'} />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    {idVenda === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Venda &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {idVenda != undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Venda &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group>
                                <Form.Input
                                    required
                                    fluid
                                    label='Cliente'
                                    width={6}
                                    maxLength="100"
                                    value={cliente}
                                    onChange={e => setCliente(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='Produto'
                                    width={6}
                                    maxLength="100"
                                    value={produto}
                                    onChange={e => setProduto(e.target.value)}
                                />

                                <FormSelect
                                    fluid
                                    label='Status Venda'
                                    width={6}
                                    options={options}
                                    placeholder='Selecione'
                                    value={statusVenda}
                                    onChange={(e, { value }) => setStatusVenda(value)}

                                />
                            </Form.Group>


                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='Data de Venda'
                                    width={6}
                                >
                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        value={dataVenda}
                                        onChange={e => setDataVenda(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    required
                                    fluid
                                    label='Valor Total'
                                    width={6}
                                    maxLength="100"
                                    value={valorTotal}
                                    onChange={e => setValorTotal(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='Observacao'
                                    width={6}
                                    maxLength="100"
                                    value={observacao}
                                    onChange={e => setObservacao(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group inline>
                                <span>Retirada Em Loja: </span>
                                <Form.Radio
                                    fluid
                                    label='Sim'
                                    value={retiradaEmLoja}
                                    onChange={e => setRetiradaEmLoja(true)}
                                />
                                <Form.Radio
                                    fluid
                                    label='Não'
                                    checked={!retiradaEmLoja}
                                    onChange={e => setRetiradaEmLoja(false)}
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
                                <Link to={'/list-venda'}>Voltar</Link>
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
