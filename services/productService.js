class ProductService {
    constructor(ProductModel) {
        this.Product = ProductModel;
    }

    async create(nome, valor) {
        try {
            const newProduct = await this.Product.create({ nome, valor });
            return newProduct;
        } catch (error) {
            throw error;
        }
    }

    async findAllProduct() {
        try {
            const products = await this.Product.findAll();
            return products;
        } catch (error) {
            throw error;
        }
    }

    async findProductById(id) {
        try {
            const product = await this.Product.findOne({ where: { id } });
            return product;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProductService;
