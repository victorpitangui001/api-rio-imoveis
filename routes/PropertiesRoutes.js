const router = require('express').Router();

const PropertieController = require('../controllers/PropertieController');

// middlewares
const verifyToken = require('../helpers/vetify-token');
const { imageUpload } = require('../helpers/image-upload');

router.post('/create',
  verifyToken,
  imageUpload.array('images'),
  PropertieController.create,
);

router.get('/', PropertieController.getAll);
router.get('/myproperties', verifyToken, PropertieController.getAllUserPropertie);
router.get('/myinterest', verifyToken, PropertieController.getAllUserInterest);
router.get('/:id', PropertieController.getPropertieById);
router.delete('/:id', verifyToken, PropertieController.removePropertieById);
router.patch('/:id',
  verifyToken,
  imageUpload.array('images'),
  PropertieController.updatePropertie
);

router.patch('/schedule/:id', verifyToken, PropertieController.schedule);
router.patch('/conclude/:id', verifyToken, PropertieController.concludeInterested);

module.exports = router;
