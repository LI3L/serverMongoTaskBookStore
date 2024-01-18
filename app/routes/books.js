const controller = require('../controllers/books');
const router = require('express').Router();
const cacheNoStore = require('../middlewares/cacheNoStore')

router.get('/', controller.listBooks);
router.get('/:id', controller.getBook);
router.get('/genre/:genre', controller.getBookByGenre);
router.get('/author/:author', controller.getBookByAuthor);
router.get('/title/:title', controller.getBookByTitle);
router.get('/year/:year', controller.getBookByYear);
router.post('/', controller.createBook);
router.patch('/:id', controller.updateBook);
router.delete('/:id', controller.deleteBook);



module.exports = router;