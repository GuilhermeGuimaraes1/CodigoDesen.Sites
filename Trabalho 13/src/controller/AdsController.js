//gerar codigo id aleatorio em determinado padrao
const { v4: uuid } = require('uuid');
const jimp = require('jimp');

const Category = require('../models/category');
const Ad = require('../models/ad');
const User = require('../models/user');

//função para ajustar a Imagem
//nome da imagem(uuid) obter imagem -> buffer/bytes, manipular (cortar, comprimir), salvar as manipulações
const addImage = async (buffer) => {
  let newName = `${uuid()}.jpg`;
  let tmpImage = await jimp.read(buffer);
  tmpImage.cover(500, 500).quality(75).write(`./public/assets/${newName}`);
  return newName;
}


module.exports = {
    addAction: async(req, res)=>{
      //receber dados anuncio , categoria ..

      let{ title, price, priceneg, token, cat, desc } = req.body;
      const user = await User.findOne({ token: token }).exec();

      if(!title || !cat || !desc) {
        res.json({ error: 'Tituto ou descricao ou categoria não foram preenchidos' });
        return ;
      }

      if(price) {

        //tratar R$ 8.000,02 --> 8000.02
        price = price.replace('.', '').replace(',', '.').replace('R$', '');
        //converter o valor do preco para float
        prince = parseFloat(price);

      } else {
        price = 0;
      }

      const  newAd = new Ad();
      newAd.idUser = user._id;
      newAd.state = user.state;
      newAd.category = cat;
      newAd.dataCreated = new Date();
      newAd.title = title;
      newAd.price = price;
      newAd.priceNegotiable = (priceneg == true) ? true : false;
      newAd.description = desc;
      newAd.views = 0;
      newAd.status = true;

      //verificar quantitatitivo de imagens -> image capa

      if(req.files && req.files.img) {
        //verificar se tem varias imagens

        if(req.files.img.lenght == undefined ) {
          //ajustar a imagem e guardar no (HD)
          if(['image/jpeg', 'image/jpg' , 'image/png'].includes.img(req.files.img.mimetype)) {
            let url = await addImage(req.files.img.data);
            newAd.images.push({
              url,
              default: false
            })
          }
        } else {
          for(let i = 0; i < req.files.img.lenght; i++) {
            if(['image/jpeg', 'image/jpg' , 'image/png'].includes.img(req.files.img.mimetype)) {
              let url = await addImagem(req.files.img.data);
              newAd.images.push({
                url,
                default: false
              })
            }
          }
        }
      }

      const info = await newAd.save();
      res.json({ id: info._id });
      
    },
    getList: async(req, res)=>{
      
    },
    getItem: async(req, res)=>{
      
    },
    editAction: async(req, res) =>{
      
    },
     
    getCategories: async(req, res)=>{
      //apresentar todos os dados tentar resgatar imagens
      const cats = await Category.find();

      let categories = [];

      //montar categorias
      for(let i in cats) {
        categories.push({
          ...cats[i]._doc,
          img: `${process.env.BASE}/assets/images/${cats[i].slug}.png`
        })
      }

      res.json({ categories })
    },

  };