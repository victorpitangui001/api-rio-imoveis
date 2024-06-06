const mongoose = require('../db/conn');
const { Schema } = mongoose;

const Properties = mongoose.model(
  'Properties',
  new Schema(
    {
      type: {
        type: String,
        enum: ['casa', 'apartamento', 'Apartamento', 'Casa'], // Valores permitidos
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      numberofrooms: {
        type: Number,
        required: true
      },
      numberofbathrooms: {
        type: Number,
        required: true
      },
      rua: {
        type: String,
        required: true
      },
      numero: {
        type: String,
        required: true
      },
      bairro: {
        type: String,
        required: true
      },
      cidade: {
        type: String,
        required: true
      },
      estado: {
        type: String,
        required: true
      },
      cep: {
        type: String,
        required: true
      },
      images: {
        type: Array,
        required: true
      },
      available: {
        type: Boolean
      },
      user: Object,
      interested: Object

    },
    { timestamps: true },
  )
);

module.exports = Properties;
