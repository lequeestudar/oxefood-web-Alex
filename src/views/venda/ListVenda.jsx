import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table, Modal, Header, ModalContent } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListVenda() {

    const [lista, setLista] = useState([]);
    const [listaVenda, setListaVenda] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState();

    const [detalheVenda, setDetalheVenda] = useState();
    const [openVendasModal, setOpenVendasModal] = useState(false);
    const [idVenda, setIdVenda] = useState(false);


    useEffect(() => {
        carregarLista();
    }, [])

    function carregarLista() {

        axios.get("http://localhost:8080/api/venda")
            .then((response) => {
                setLista(response.data)
            })
    }

    function carregarVenda(id) {

        axios.get("http://localhost:8080/api/venda/" + id)
           .then((response) => {
               setListaVenda(response.data)
               setIdVenda(true)
           })
   }


    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }

    function confirmaRemover(id) {
        setOpenModal(true)
        setIdRemover(id)
    }

    async function remover() {

        await axios.delete('http://localhost:8080/api/venda/' + idRemover)
            .then((response) => {

                console.log('Venda removido com sucesso.')

                axios.get("http://localhost:8080/api/venda")
                    .then((response) => {
                        setLista(response.data)
                    })
            })
            .catch((error) => {
                console.log('Erro ao remover um venda.')
            })
        setOpenModal(false)
    }


    return (
        <div>
            <MenuSistema tela={'venda'} />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> Venda </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Button
                            label='Novo'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-venda'
                        />
                        <br /><br /><br />

                        <Table color='orange' sortable celled>

                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Cliente</Table.HeaderCell>
                                    <Table.HeaderCell>Produto</Table.HeaderCell>
                                    <Table.HeaderCell>Status de Venda</Table.HeaderCell>
                                    <Table.HeaderCell>Data da Venda</Table.HeaderCell>
                                    <Table.HeaderCell>Valor Total</Table.HeaderCell>
                                    {/* <Table.HeaderCell>Observacao</Table.HeaderCell> */}
                                    <Table.HeaderCell>Retirada Em Loja</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>

                                {lista.map(venda => (

                                    <Table.Row key={venda.id}>
                                        <Table.Cell>{venda.cliente}</Table.Cell>
                                        <Table.Cell>{venda.produto}</Table.Cell>
                                        <Table.Cell>{venda.statusVenda}</Table.Cell>
                                        <Table.Cell>{formatarData(venda.dataVenda)}</Table.Cell>
                                        <Table.Cell>{venda.valorTotal}</Table.Cell>
                                        <Table.Cell>{venda.retiradaEmLoja ? 'Sim' : 'Nao'}</Table.Cell>
                                        <Table.Cell textAlign='center'>

                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados deste venda'
                                                icon>
                                                <Link to="/form-venda" state={{ id: venda.id }} style={{ color: 'green' }}> <Icon name='edit' /> </Link>
                                            </Button>
                                            &nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover este venda'
                                                icon
                                                onClick={e => confirmaRemover(venda.id)}>
                                                <Icon name='trash' />
                                            </Button>

                                            <Button
                                                inverted
                                                circular
                                                color='grey'
                                                title='Clique aqui para ver detalhes dessa venda'
                                                icon
                                                onClick={e => carregarVenda(venda.id)}>
                                                <Icon name='eye' style={{ color: 'grey' }} />
                                            </Button>

                                        </Table.Cell>
                                    </Table.Row>
                                ))}

                            </Table.Body>
                        </Table>
                    </div>
                </Container>
            </div>

            <Modal
                basic
                onClose={() => setOpenModal(false)}
                onOpen={() => setOpenModal(true)}
                open={openModal}
            >
                <Header icon>
                    <Icon name='trash' />
                    <div style={{ marginTop: '5%' }}> Tem certeza que deseja remover esse registro? </div>
                </Header>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                        <Icon name='remove' /> Não
                    </Button>
                    <Button color='green' inverted onClick={() => remover()}>
                        <Icon name='checkmark' /> Sim
                    </Button>
                </Modal.Actions>
            </Modal>

            <Modal
                basic
                onClose={() => setIdVenda(false)}
                onOpen={() => setIdVenda(true)}
                open={idVenda}
            >
                <Header icon>
                    <Icon name='eye' />
                    <div style={{ marginTop: '5%' }}> Detalhes da Venda </div>
                </Header>
                <ModalContent>
                    <Table>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell width={4} ><strong>Cliente</strong></Table.Cell>
                                <Table.Cell>{listaVenda.cliente}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell><strong>Produto</strong></Table.Cell>
                                <Table.Cell>{listaVenda.produto}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell><strong>Status da Venda</strong></Table.Cell>
                                <Table.Cell>{listaVenda.statusVenda}</Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell><strong>Data da Venda</strong></Table.Cell>
                                <Table.Cell>{listaVenda.dataVenda}</Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell><strong>Valor Total</strong></Table.Cell>
                                <Table.Cell>{listaVenda.valorTotal}</Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell><strong>Observação</strong></Table.Cell>
                                <Table.Cell>{listaVenda.observacao}</Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell><strong>Retirado em Loja</strong></Table.Cell>
                                <Table.Cell>{listaVenda.retiradaEmLoja ? "Sim" : "Não"}</Table.Cell>
                            </Table.Row>

                        </Table.Body>
                    </Table>
                </ModalContent>


            </Modal>

        </div>
    )
}