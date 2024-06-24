//controllers/process/DepartmentProcessController.js


class DepartmentProcessingController{
    
    constructor(DepartmentProcessingService){
        this.DepartmentProcessing = DepartmentProcessingService;
    }


    async create(req,res){
        const{nome}=req.body;

        try{
            const result = await this.DepartmentProcessing.create(nome);
            res.status(200).json(result);
        } catch(error){
            console.error('Erro no controlador ao criar:', error);
            res.status(500).json({ error: "Erro ao inserir novo Registro", detalhes: error.message });
        }


}}


module.exports = DepartmentProcessingController;