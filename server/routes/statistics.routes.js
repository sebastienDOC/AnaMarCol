const router = require('express').Router();
const statisticsController = require('../controllers/stats.controller');

// Statistiques générales
router.get('/articles', statisticsController.getNumberOfArticles);
router.get('/stock', statisticsController.getTotalStock);
router.get('/fournisseurs', statisticsController.getNumberOfSuppliers);
router.get('/articles/stockinf3', statisticsController.getNumberOfArticlesWithStockBelow3);
router.get('/articles/low-stock', statisticsController.getArticlesWithLowStock);

// Fournisseurs
router.get('/fournisseurs/list', statisticsController.getFournisseursList);
router.get('/fournisseurs/:fournisseur', statisticsController.getStatisticsForFournisseur);

// État
router.get('/etats/list', statisticsController.getEtatsList);
router.get('/etats/:etat', statisticsController.getStatisticsForEtat);

module.exports = router;
