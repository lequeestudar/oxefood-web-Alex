import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table, Modal, Header } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListEntregador() {

    const [lista, setLista] = useState([]);
    const [lista2, setLista2] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState();

    const [detalheEntregador, setDetalheEntregador] = useState();
    const [openDetalhesModal, setOpenDetalhesModal] = useState(false);
    const [idEntregador, setIdEntregador] = useState(false);

    useEffect(() => {
        carregarLista();
    }, [])

     function carregarLista() {

         axios.get("http://localhost:8080/api/entregador")
            .then((response) => {
                setLista(response.data)
            })
    }

     function carregarEntregador(id) {

         axios.get("http://localhost:8080/api/entregador/" + id)
            .then((response) => {
                setLista2(response.data)
                setIdEntregador(true)
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

     function remover() {

         axios.delete('http://localhost:8080/api/entregador/' + idRemover)
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
                                                onClick={e => carregarEntregador(entregador.id)}>
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
                onClose={() => setIdEntregador(false)}
                onOpen={() => setIdEntregador(true)}
                open={idEntregador}
            >
                <Header icon>
                    <Icon name='eye' />
                    <div style={{ marginTop: '5%' }}> Detalhes do Entregador </div>
                </Header>
                <Modal.Content>
                    <Table>

                        <Table.Body>

                            
                                <Table.Row>
                                    <Table.Cell width={4} ><strong>Nome</strong></Table.Cell>
                                    <Table.Cell>{lista2.nome}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell><strong>CPF</strong></Table.Cell>
                                    <Table.Cell>{lista2.cpf}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell><strong>RG</strong></Table.Cell>
                                    <Table.Cell>{lista2.rg}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell><strong>Data de Nascimento</strong></Table.Cell>
                                    <Table.Cell>{lista2.dataNascimento}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell><strong>Fone Celular</strong></Table.Cell>
                                    <Table.Cell>{lista2.foneCelular}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell><strong>Fone Fixo</strong></Table.Cell>
                                    <Table.Cell>{lista2.foneFixo}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell><strong>QTD Entregas Realizadas</strong></Table.Cell>
                                    <Table.Cell>{lista2.qtdEntregasRealizadas}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell><strong>Valor do Frete</strong></Table.Cell>
                                    <Table.Cell>{lista2.valorFrete}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell><strong>Endereco da Rua</strong></Table.Cell>
                                    <Table.Cell>{lista2.enderecoRua}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell><strong>Complemento</strong></Table.Cell>
                                    <Table.Cell>{lista2.enderecoComplemento}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell><strong>Numero</strong></Table.Cell>
                                    <Table.Cell>{lista2.enderecoNumero}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell><strong>Bairro</strong></Table.Cell>
                                    <Table.Cell>{lista2.enderecoBairro}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell><strong>Cidade</strong></Table.Cell>
                                    <Table.Cell>{lista2.enderecoCidade}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell><strong>Cep</strong></Table.Cell>
                                    <Table.Cell>{lista2.enderecoCep}</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell><strong>UF</strong></Table.Cell>
                                    <Table.Cell>{lista2.enderecoUf}</Table.Cell>
                                </Table.Row>
                                <Table.Row>

                                    <Table.Cell><strong>Ativo</strong></Table.Cell>
                                    <Table.Cell>{lista2.ativo ? "Sim" : "Não"}</Table.Cell>
                                </Table.Row>
                           
                        </Table.Body>
                    </Table>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setIdEntregador(false)}>
                        <Icon name='remove' /> Fechar
                    </Button>
                </Modal.Actions>
            </Modal>

        </div>
    )
}
