const Properties = require('../models/Properties');

const twilio = require('twilio');

//helpers
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = class PropertiesController {
  // Create properties
  static async create(req, res) {
    const { type, price, numberofrooms, numberofbathrooms, rua, numero, bairro, cidade, estado, cep } = req.body;

    const images = req.files

    const available = true;

    //images upload


    // validation
    if (!type) {
      res.status(422).json({ message: "O Tipo é obrigatório" });
      return
    }

    if (!price) {
      res.status(422).json({ message: "O preço é obrigatório" });
      return
    }

    if (!numberofrooms) {
      res.status(422).json({ message: "O numero de quartos é obrigatório" });
      return
    }

    if (!numberofbathrooms) {
      res.status(422).json({ message: "O de banheiros obrigatório" });
      return
    }

    if (!rua) {
      res.status(422).json({ message: "O nome da rua é obrigatório" });
      return
    }

    if (!numero) {
      res.status(422).json({ message: "O númeo é obrigatório" });
      return
    }

    if (!bairro) {
      res.status(422).json({ message: "O bairro é obrigatório" });
      return
    }

    if (!cidade) {
      res.status(422).json({ message: "A cidade é obrigatório" });
      return
    }

    if (!estado) {
      res.status(422).json({ message: "O Estado é obrigatório" });
      return
    }

    if (!cep) {
      res.status(422).json({ message: "O cep é obrigarotio" });
      return
    }

    if (images.length === 0) {
      res.status(422).json({ message: "A imagem é obrigatório" });
      return
    }

    // get pet owner
    const token = getToken(req)
    const user = await getUserByToken(token)
    // Create propertie
    const propertie = new Properties({
      type,
      price,
      numberofrooms,
      numberofbathrooms,
      rua,
      numero,
      bairro,
      cidade,
      estado,
      cep,
      available,
      images: [],
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      }
    });

    images.map((image) => {
      propertie.images.push(image.filename);
    });

    try {
      const newPropertie = await propertie.save();
      res.status(201).json({
        message: 'Propertie cadastrado com sucesso!',
        newPropertie
      });
    } catch (error) {
      res.status(500).json({ message: error })
    }

  }


  static async getAll(req, res) {
    const properties = await Properties.find().sort('-createdAt');

    res.status(200).json({
      properties: properties,
    })
  }

  static async getAllUserPropertie(req, res) {

    //get user from token
    const token = getToken(req);
    const user = await getUserByToken(token);

    const properties = await Properties.find({ 'user._id': user._id }).sort('-createdAt');

    res.status(200).json({
      properties,
    });
  }

  static async getAllUserInterest(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);

    const properties = await Properties.find({ 'interested._id': user._id }).sort('-createdAt');

    res.status(200).json({
      properties,
    });
  }

  static async getPropertieById(req, res) {
    const id = req.params.id;

    // check if id is valid
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "Id inválido." });
      return
    }

    // check if propertie exists
    const propertie = await Properties.findOne({ _id: id });

    if (!propertie) {
      res.status(404).json({ message: 'Propiedade não encontrada.' });
    }

    res.status(200).json({
      propertie: propertie
    });
  }

  static async removePropertieById(req, res) {
    const id = req.params.id;

    // check if id is valid
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "Id inválido." });
      return
    }

    // check if propertie exists
    const propertie = await Properties.findOne({ _id: id });

    if (!propertie) {
      res.status(404).json({ message: 'Propiedade não encontrada.' });
      return
    }

    // check if logged in user registered the propertie
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (propertie.user._id.toString() !== user._id.toString()) {
      res.status(422).json({ message: 'Houve um problema em processar a sua  solicitação, tente novamente mais tarde.' });
      return
    }

    await Properties.findByIdAndDelete(id);

    res.status(200).json({ message: 'Propiedade removida com sucesso.' });
  }

  static async updatePropertie(req, res) {
    const id = req.params.id;

    const { type, price, numberofrooms, numberofbathrooms, rua, numero, bairro, cidade, estado, cep } = req.body;

    const images = req.files;

    const updatedData = {};

    // check if propertie exists
    const propertie = await Properties.findOne({ _id: id });

    if (!propertie) {
      res.status(404).json({ message: 'Propiedade não encontrada.' });
      return
    }

    // check if logged in user registered the propertie
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (propertie.user._id.toString() !== user._id.toString()) {
      res.status(422).json({ message: 'Houve um problema em processar a sua  solicitação, tente novamente mais tarde.' });
      return
    }

    // validation
    if (!type) {
      res.status(422).json({ message: "O tipo é obrigatório" });
      return
    }

    if (!price) {
      res.status(422).json({ message: "O preço é obrigatório" });
      return
    }

    if (!numberofrooms) {
      res.status(422).json({ message: "O numero de quartos é obrigatório" });
      return
    }

    if (!numberofbathrooms) {
      res.status(422).json({ message: "O de banheiros obrigatório" });
      return
    }

    if (!rua) {
      res.status(422).json({ message: "O nome da rua é obrigatório" });
      return
    }

    if (!numero) {
      res.status(422).json({ message: "O númeo é obrigatório" });
      return
    }

    if (!bairro) {
      res.status(422).json({ message: "O bairro é obrigatório" });
      return
    }

    if (!cidade) {
      res.status(422).json({ message: "A cidade é obrigatório" });
      return
    }

    if (!estado) {
      res.status(422).json({ message: "O Estado é obrigatório" });
      return
    }

    if (!cep) {
      res.status(422).json({ message: "O cep é obrigarotio" });
      return
    }

    if (images.length > 0) {
    } else {
      updatedData.images = [];
      images.map((image) => {
        updatedData.images.push(image.filename)
      })
    }

    await Properties.findByIdAndUpdate(id, updatedData);

    res.status(200).json({ message: 'Propiedade atualizada com sucesso.' })

  }

  static async schedule(req, res) {
    const id = req.params.id

    // check if propertie exists
    const propertie = await Properties.findOne({ _id: id });

    if (!propertie) {
      res.status(404).json({ message: 'Propiedade não encontrada.' });
      return
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (propertie.user._id.equals(user._id)) {
      res.status(422).json({ message: 'Você não pode agendar uma visita para a sua própia propiedade.' });
      return
    }

    // check if user has already scheduled a visit
    if (propertie.interested) {
      if (propertie.interested._id.equals(user._id)) {
        res.status(422).json({ message: 'Você já agendou uma visita para essa própiedade.' });
        return
      }
    }

    //add user to pet

    propertie.interested = {
      _id: user._id,
      name: user.name,
      image: user.image
    }

    await Properties.findByIdAndUpdate(id, propertie);

    res.status(200).json({
      message: 'A visita foi agendada com sucesso, Entre em contato com o Corretor Mario pelo número XXX-XXX.'
    })
  }

  static async concludeInterested(req, res) {
    const id = req.params.id

    // check if propertie exists
    const propertie = await Properties.findOne({ _id: id });

    if (!propertie) {
      res.status(404).json({ message: 'Propiedade não encontrada.' });
      return
    }

    // check if logged in user registered the propertie
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (propertie.user._id.toString() !== user._id.toString()) {
      res.status(422).json({ message: 'Houve um problema em processar a sua  solicitação, tente novamente mais tarde.' });
      return
    }

    propertie.available = false;

    await Properties.findByIdAndUpdate(id, propertie);

    res.status(200).json({
      message: "Parabéns conseguimos alugar a sua propiedade."
    })
  }
}
