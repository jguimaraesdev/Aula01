// ./controllers/ProductController.js
class ProductController {
    
    constructor(productService) {
        this.productService = productService;
    }

    //--------------------------------------------------------------------------------------------------//

    async create(req, res) {
        const { nome, descricao, status } = req.body;
        try {
            const newProduct = await this.productService.create(nome, descricao, status);
            res.status(200).json(newProduct);
        } catch (error) {
            res.status(500).json({ error: "Erro ao inserir o novo produto" });
        }
    }

    //--------------------------------------------------------------------------------------------------//

    async update(req, res) {
        const productId = req.params.id;
        const updates = req.body;
        try {
            // Verificar se o ID do registro é um número válido
            if (isNaN(productId)) {
                return res.status(400).json({ error: "ID de registro inválido" });
            }
    
            // Verificar se os dados de atualização estão presentes
            if (!updates || Object.keys(updates).length === 0) {
                return res.status(400).json({ error: "Dados de atualização inválidos" });
            }
            // Chamar o método update da productService para realizar a atualização
            const { updatedRowsCount, updatedRows } = await this.productService.update(productId, updates);

            // Verificar se o registro foi encontrado e atualizado com sucesso
            if (updatedRowsCount > 0) {
                return res.status(200).json({ message: "Registro atualizado com sucesso"});
            } else {
                res.status(404).json({ error: "Produto não encontrado", updatedRowsCount, updatedRows  });
            }
        } catch (error) {
            // Tratar erros gerais
            console.error("Erro ao atualizar registro:", error);
            return res.status(500).json({ error: "Erro ao atualizar registro" });
        }
    }

    //--------------------------------------------------------------------------------------------------//
    
    async findAllProduct(req, res) {
        const { page, pageSize } = req.query;
        try {
            const products = await this.productService.findAllProduct(page, pageSize);
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar produtos" });
        }
    }

    //--------------------------------------------------------------------------------------------------//
    async findProductById(req, res) {
        const productId = req.params.id;
        try {
            const product = await this.productService.findProductById(productId);
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ error: "Produto não encontrado" });
            }
        } catch (error) {
            res.status(500).json({ error: "Erro interno do servidor" });
        }
    }

    //--------------------------------------------------------------------------------------------------//

    async getPosicaoByDeposito(req, res) {
        const depositoId = req.params.depositoId;
        try {
            const posicao = await this.productService.getPosicaoByDeposito(depositoId);
            res.status(200).json(posicao);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar posição por depósito" });
        }
    }
    
    //--------------------------------------------------------------------------------------------------//

    async getPosicaoByProdutoDeposito(req, res) {
        const { produtoId, depositoId } = req.params;
        try {
            const posicao = await this.productService.getPosicaoByProdutoDeposito(produtoId, depositoId);
            res.status(200).json(posicao);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar posição por produto e depósito" });
        }
    }

    //--------------------------------------------------------------------------------------------------//
    
    async delete (req, res){
        try{
            await this.productService.delete(req.params.id);
            res.status(204).send();
    
        }catch(erro){
            res.status(400).json({ error: error.message});
        }
    }

    //--------------------------------------------------------------------------------------------------//
}

module.exports = ProductController;
