import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table, Modal, Header } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListEntregador() {

    const [lista, setLista] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState();

    const [detalheEntregador, setDetalheEntregador] = useState();
    const [openDetalhesModal, setOpenDetalhesModal] = useState(false);
    const [idEntregador, setIdEntregador] = useState ();

    useEffect(() => {
        carregarLista();
    }, [])

    useEffect(() => {
        carregarEntregador();
    }, [idEntregador])

    function carregarLista() {

        axios.get("http://localhost:8080/api/entregador")
            .then((response) => {
                setLista(response.data)
            })
    }

    function carregarEntregador() {

        axios.get("http://localhost:8080/api/entregador/"+ idEntregador)
            .then((response) => {
                setLista(response.data)
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
        const entregadorSelecionado = lista.find(entregador => entregador.id === id);
        setDetalheEntregador(entregadorSelecionado);
        setOpenDetalhesModal(true);
    }

    function verTudo(id) {
        setDetalheEntregador(true);
        setOpenDetalhesModal(id);
    }

    async function remover() {

        await axios.delete('http://localhost:8080/api/entregador/' + idRemover)
            .then((response) => {

                console.log('Entregador removido com sucesso.')

                axios.get("http://localhost:8080/api/entregador")
                    .then((response) => {
                        setLista(response.data)
                    })
            })
            .catch((error) => {
                console.log('Erro ao remover um entregador.')
            })
        setOpenModal(false)
    }


    return (
        <div>
            <MenuSistema tela={'entregador'} />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> Entregador </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Button
                            label='Novo'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-entregador'
                        />
                        <br /><br /><br />

                        <Table color='orange' sortable celled>

                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Nome</Table.HeaderCell>
                                    {/* <Table.HeaderCell>CPF</Table.HeaderCell> */}
                                    {/* <Table.HeaderCell>RG</Table.HeaderCell> */}
                                    {/* <Table.HeaderCell>Data de Nascimento</Table.HeaderCell> */}
                                    <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                                    <Table.HeaderCell>Fone Fixo</Table.HeaderCell>
                                    <Table.HeaderCell>Qtd Entregas Realizadas</Table.HeaderCell>
                                    <Table.HeaderCell>Valor Frete</Table.HeaderCell>
                                    {/* <Table.HeaderCell>Endereço Rua</Table.HeaderCell> */}
                                    {/* <Table.HeaderCell>Endereço Complemento</Table.HeaderCell> */}
                                    {/* <Table.HeaderCell>Endereço Número</Table.HeaderCell> */}
                                    {/* <Table.HeaderCell>Endereço Bairro</Table.HeaderCell> */}
                                    {/* <Table.HeaderCell>Endereço Cidade</Table.HeaderCell> */}
                                    {/* <Table.HeaderCell>Endereço CEP</Table.HeaderCell> */}
                                    {/* <Table.HeaderCell>Endereço UF</Table.HeaderCell> */}
                                    <Table.HeaderCell>Ativo</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>

                                {lista.map(entregador => (

                                    <Table.Row key={entregador.id}>
                                        <Table.Cell>{entregador.nome}</Table.Cell>
                                        {/* <Table.Cell>{entregador.cpf}</Table.Cell> */}
                                        {/* <Table.Cell>{entregador.rg}</Table.Cell> */}
                                        {/* <Table.Cell>{formatarData(entregador.dataNascimento)}</Table.Cell> */}
                                        <Table.Cell>{entregador.foneCelular}</Table.Cell>
                                        <Table.Cell>{entregador.foneFixo}</Table.Cell>
                                        <Table.Cell>{entregador.qtdEntregasRealizadas}</Table.Cell>
                                        <Table.Cell>{entregador.valorFrete}</Table.Cell>
                                        {/* <Table.Cell>{entregador.enderecoRua}</Table.Cell> */}
                                        {/* <Table.Cell>{entregador.enderecoComplemento}</Table.Cell> */}
                                        {/* <Table.Cell>{entregador.enderecoNumero}</Table.Cell> */}
                                        {/* <Table.Cell>{entregador.enderecoBairro}</Table.Cell> */}
                                        {/* <Table.Cell>{entregador.enderecoCidade}</Table.Cell> */}
                                        {/* <Table.Cell>{entregador.enderecoCep}</Table.Cell> */}
                                        {/* <Table.Cell>{entregador.enderecoUf}</Table.Cell> */}
                                        <Table.Cell>{entregador.ativo ? 'Ativo' : 'Inativo'}</Table.Cell>
                                        <Table.Cell textAlign='center'>

                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados deste entregador'
                                                icon>
                                                <Link to="/form-entregador" state={{ id: entregador.id }} style={{ color: 'green' }}> <Icon name='edit' /> </Link>
                                            </Button>
                                            &nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover este entregador'
                                                icon
                                                onClick={e => confirmaRemover(entregador.id)}>
                                                <Icon name='trash' />
                                            </Button>

                                            <Button
                                                inverted
                                                circular
                                                color='grey'
                                                title='Clique aqui para remover este entregador'
                                                icon
                                                onClick={e => verTudo(entregador.id)}>
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
                onClose={() => setOpenDetalhesModal(false)}
                onOpen={() => setOpenDetalhesModal(true)}
                open={openDetalhesModal}
            >
                <Header icon>
                    <Icon name='eye' />
                    <div style={{ marginTop: '5%' }}> Detalhes do Entregador </div>
                </Header>
                <Modal.Content>
                    {detalheEntregador && (
                        <div>
                            <p><strong>Nome:</strong> {detalheEntregador.nome}</p>
                            <p><strong>Fone Celular:</strong> {detalheEntregador.foneCelular}</p>
                            <p><strong>Fone Fixo:</strong> {detalheEntregador.foneFixo}</p>
                            <p><strong>Qtd Entregas Realizadas:</strong> {detalheEntregador.qtdEntregasRealizadas}</p>
                            <p><strong>Valor Frete:</strong> {detalheEntregador.valorFrete}</p>
                            <p><strong>Ativo:</strong> {detalheEntregador.ativo ? 'Ativo' : 'Inativo'}</p>
                        </div>
                    )}
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpenDetalhesModal(false)}>
                        <Icon name='remove' /> Fechar
                    </Button>
                </Modal.Actions>
            </Modal>

        </div>
    )
}
