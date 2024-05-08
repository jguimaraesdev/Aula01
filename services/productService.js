class ProductService {
    constructor(ProductModel) {
        this.Product = ProductModel;
    }

    //--------------------------------------------------------------------------------------------------//

    async create(nome, valor) {
        try {
            const newProduct = await this.Product.create({ nome, valor });
            return newProduct;
        } catch (error) {
            throw error;
        }
    }

    //--------------------------------------------------------------------------------------------------//

    async update(id, updates) {
        try {
            const [updatedRowsCount, updatedRows] = await this.Product.update(updates, {
                where: { id },
                returning: true // Para retornar os registros atualizados
            });
            return { updatedRowsCount, updatedRows };
        } catch (error) {
            throw error;
        }
    }

    //--------------------------------------------------------------------------------------------------//

    async findAllProduct() {
        try {
            const allproducts = await this.Product.findAll();
            return allproducts;
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
}

module.exports = ProductService;
