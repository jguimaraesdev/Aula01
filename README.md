# Sistema de Compra e Venda

Este projeto consiste no desenvolvimento de um sistema de compra e venda baseado em **JavaScript/Node.js**, projetado para atender pequenas e médias empresas, oferecendo funcionalidades robustas e eficientes para operações comerciais, arquitetura similar ao SAP.

## 📋 Funcionalidades

- **Controle de Transações**: Gerenciamento de operações de compra e venda.
- **Gestão Financeira**: Controle de contas a pagar e a receber.
- **Validações Automáticas**: Garantia da integridade das transações.
- **Segurança Avançada**:
  - Autenticação JWT.
  - Criptografia de senhas com **Bcrypt**.

## 🛠️ Tecnologias Utilizadas

- **Backend**: Node.js
- **Banco de Dados**: MySQL
- **ORM**: Sequelize
- **Autenticação**: JWT
- **Segurança**: Bcrypt para criptografia de senhas

## 🏷️ Entidades Representadas

- **Cliente.js**: Contém informações sobre os clientes, como nome, endereço e dados de contato.
- **ControleProduct.js**: Gerencia o controle de produtos no sistema, incluindo estoque e disponibilidade.
- **ControleTitle.js**: Gerencia os títulos de cobrança e pagamentos associados às transações.
- **NotaFiscal.js**: Registra as transações de compra ou venda, incluindo detalhes fiscais e valores.
- **Sell.js**: Representa as transações de venda, incluindo os itens vendidos e os dados do cliente.
- **SellDetails.js**: Detalha os itens vendidos em cada transação, como quantidades e valores.
- **Title.js**: Representa os títulos de pagamento, como contas a pagar ou a receber.
- **CostCenter.js**: Define os centros de custo dentro da empresa para alocação de despesas e receitas.
- **Department.js**: Representa os departamentos da empresa, facilitando a gestão de operações internas.
- **Deposit.js**: Controla os depósitos realizados, como pagamentos de clientes ou fornecedores.
- **Product.js**: Representa os produtos disponíveis para venda, com informações como nome, preço e categoria.
- **Purchase.js**: Registra as compras realizadas, incluindo detalhes de fornecedores e valores.
- **Quotation.js**: Representa as cotações feitas para os clientes, incluindo preços e condições de venda.
- **Requisition.js**: Controla as requisições de compras, com detalhes sobre os itens solicitados e os fornecedores.
- **Supplier.js**: Contém informações sobre os fornecedores, como nome, contato e produtos fornecidos.
- **User.js**: Representa os usuários do sistema, com informações sobre login e permissões.
- **Xtelefone.js**: Gerencia os números de telefone dos clientes e fornecedores.

## 🚀 Benefícios

- **Simplicidade no Gerenciamento de Dados**: Integração com MySQL e uso do Sequelize para facilitar a manipulação de informações.
- **Solução Escalável**: Ideal para pequenas e médias empresas.
- **Foco na Segurança**: Proteção avançada para dados sensíveis.

---

### 📄 Licença

Este projeto está disponível sob a licença [MIT](LICENSE).

### 🧑‍💻 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e enviar pull requests.

### 📞 Contato

- **Desenvolvedor:** Jhonny Guimarães  
- **E-mail:** guimaraes.jhonny@outlook.com  
- **LinkedIn:** [Jhonny Guimarães](http://www.linkedin.com/in/jhonny-guimaraes)
