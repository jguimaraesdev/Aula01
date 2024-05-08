class ProductController {
    
    constructor(productService) {
        this.productService = productService;
    }

    //--------------------------------------------------------------------------------------------------//

    async create(req, res) {
        const { nome, valor } = req.body;
        try {
            const newProduct = await this.productService.create(nome, valor);
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
            const { updatedRowsCount, updatedRows } = await this.productService.update(productId, updates);
            if (updatedRowsCount > 0) {
                res.status(200).json(updatedRows);
            } else {
                res.status(404).json({ error: "Produto não encontrado" });
            }
        } catch (error) {
            res.status(500).json({ error: "Erro ao atualizar produto" });
        }
    }

    //--------------------------------------------------------------------------------------------------//
    async findAllProduct(req, res) {
        try {
            const products = await this.productService.findAllProduct();
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
}

module.exports = ProductController;
