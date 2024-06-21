//controllers/process/DepartmentProcessController.js


class DepartmentProcessController{
    
    constructor(DepartmentProcessService){
        this.DepartmentProcess = DepartmentProcessService;
    }


    async create(req,res){
        const{nome}=req.body;

        try{

            const result = await this.DepartmentProcess.create({nome});

            res.status(200).json(result);

        } catch(error){

            res.status(500).json({ error: "Erro ao inserir novo Registro" });

        }


}}


module.exports = DepartmentProcessController;