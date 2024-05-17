// ./services/productService.js

class ProductService {
    constructor(ProductModel) {
        this.Product = ProductModel;
    }

    //--------------------------------------------------------------------------------------------------//

    async create(nome, valor, status) {
        try {
            const newProduct = await this.Product.create({ nome, valor, status });
            return newProduct;
        } catch (error) {
            throw error;
        }
    }

    //--------------------------------------------------------------------------------------------------//

    async update(id, updates) {
        try {
            // Verificar se o ID fornecido é válido
            if (!id) {
                throw new Error("ID inválido para atualização");
            }
    
            // Atualizar os registros na tabela
            const [updatedRowsCount, updatedRows] = await this.Product.update(updates, {
                where: { id },
            });
            
            // Verificar se algum registro foi atualizado
            if (updatedRowsCount === 0) {
                throw new Error("Nenhum registro encontrado para atualização");
            } else {
                // Retornar algo específico para indicar que a atualização foi bem-sucedida
                return { message: "Atualização bem-sucedida", updatedRowsCount, updatedRows };
            }
        } catch (error) {
            // Lançar novamente o erro para ser tratado na camada de controle
            throw error;
        }
    }

    //--------------------------------------------------------------------------------------------------//

    async findAllProduct(page = 1, pageSize = 10) {
        try {
            const offset = (page - 1) * pageSize;
            const products = await this.Product.findAndCountAll({
                limit: pageSize,
                offset: offset
            });
            return products;
        } catch (error) {
            throw error;
        }
    }

    //--------------------------------------------------------------------------------------------------//

    async findProductById(id) {
        try {
            const product = await this.Product.findOne({ where: { id } });
            return product;
        } catch (error) {
            throw error;
        }
    }
    //--------------------------------------------------------------------------------------------------//

    async getPosicaoByDeposito(depositoId) {
        try {
            const posicao = await this.Product.findAll({
                include: [{
                    model: this.Moviments,
                    where: { depositId: depositoId }
                }]
            });
            return posicao;
        } catch (error) {
            throw error;
        }
    }
    
    //--------------------------------------------------------------------------------------------------//

    async getPosicaoByProdutoDeposito(produtoId, depositoId) {
        try {
            const posicao = await this.Product.findOne({
                include: [{
                    model: this.Moviments,
                    where: { productId: produtoId, depositId: depositoId }
                }]
            });
            return posicao;
        } catch (error) {
            throw error;
        }
    }

    //--------------------------------------------------------------------------------------------------//
    
    
}

module.exports = ProductService;
