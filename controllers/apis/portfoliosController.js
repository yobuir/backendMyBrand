const Portfolios= require('../../models/portfolios');

const portfolios_index = (req,res) => {
      Portfolios.find().then((result) => {
        return res
               .send({ message: "viewing Portfolios",data:result});
    }).catch((err) => {
        return  res.send({ message: "Error viewing Portfolios",error: err.message })
    });
}

const portfolios_view =  async (req,res) => {
    const id=req.params.id;
      await Portfolios.findById(id).then((result) => {
       return res
               .send({ message: "Viewing single Portfolio",data:result});
    }).catch((err) => {
        return  res.send({ message: "Error viewing Portfolio",error: err.message })
    });
}


const portfolios_create = async (req, res) => { 

    let userPortfolios=req.body;
    
        const postuserPortfolios = new Portfolios(userPortfolios);
        postuserPortfolios.save().then ((result)=>{
            return res
                .send({ message: "Portfolio saved",data:result});
        }).catch((err) => {
            return  res.send({ message: "Error saving Portfolio",error: err.message }).status(500);
        });
    };

const portfolios_update = async(req,res)=>{
    const id= req.params.id;
        const portfolios_update= req.body;
        Portfolios.findByIdAndUpdate(id, portfolios_update).then((result) => {
            return res
                .send({ message: "Portfolio updated",data:result});
        }).catch((err) => {
            return  res.send({ message: "Error updating Portfolio",error: err.message }).status(500);
    });
};
    const portfolios_delete = async(req,res)=>{
        const id=req.params.id;
        Portfolios.findByIdAndDelete(id).then((result) => {
            return  res.send({ message: "Portfolio deleted",data:result });
        }).catch((err)=>{
            return  res.send({ message: "Error deleting Portfolio",error: err.message }).status(500);
        });
    };

module.exports ={portfolios_view,portfolios_index,portfolios_create,portfolios_update,portfolios_delete};