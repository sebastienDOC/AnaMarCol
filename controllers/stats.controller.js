const ItemModel = require('../models/item.model');

exports.getNumberOfArticles = async (req, res) => {
    try {
        const numberOfArticles = await ItemModel.countDocuments();
        res.status(200).json({ numberOfArticles: `${numberOfArticles}`});
    } catch (error) {
        console.error('Erreur lors du calcul du nombre d\'articles :', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getTotalStock = async (req, res) => {
    try {
        const totalStock = await ItemModel.aggregate([
            {
              $match: { quantite: { $exists: true } }
            },
            {
              $group: {
                _id: null,
                totalStock: {
                  $sum: { $toInt: '$quantite' }
                }
              }
            }
          ]);          
      res.status(200).json({ totalStock: `${totalStock[0].totalStock}` || 0 });
    } catch (error) {
      console.error('Erreur lors du calcul du stock total :', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};
  
exports.getNumberOfSuppliers = async (req, res) => {
    try {
      const distinctSuppliers = await ItemModel.distinct('fournisseur');
      const numberOfSuppliers = distinctSuppliers.length;
      res.status(200).json({ numberOfSuppliers: `${numberOfSuppliers}` || 0 });
    } catch (error) {
      console.error('Erreur lors du calcul du nombre de fournisseurs :', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

  
exports.getNumberOfArticlesWithStockBelow5 = async (req, res) => {
    try {
      const numberOfLowStockArticles = await ItemModel.countDocuments({
        $expr: {
          $lt: [ { $toInt: "$quantite" }, 5 ]
        }
      });
      res.status(200).json({ numberOfLowStockArticles: `${numberOfLowStockArticles}` || 0 });
    } catch (error) {
      console.error('Erreur lors du calcul du nombre d\'articles avec un stock inférieur à 5 :', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Fournisseurs
exports.getStatisticsForFournisseur = async (req, res) => {
    try {
      const fournisseur = req.params.fournisseur.toLowerCase();
      const numberOfArticles = await ItemModel.countDocuments({ fournisseur });
  
      const totalStock = await ItemModel.aggregate([
        {
          $match: { fournisseur, quantite: { $exists: true } }
        },
        {
          $group: {
            _id: null,
            totalStock: {
              $sum: { $toInt: '$quantite' }
            }
          }
        }
      ]);
  
      console.log('Data for Fournisseur:', { numberOfArticles, totalStock });
  
      const numberOfLowStockArticles = await ItemModel.countDocuments({
        fournisseur,
        $expr: {
          $lt: [ { $toInt: "$quantite" }, 5 ]
        }
      });
  
      res.status(200).json({
        numberOfArticles: `${numberOfArticles}`,
        totalStock: `${totalStock[0]?.totalStock}` || 0,
        numberOfLowStockArticles: `${numberOfLowStockArticles}` || 0
      });
    } catch (error) {
      console.error(`Erreur lors du calcul des statistiques pour le fournisseur ${req.params.fournisseur} :`, error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

// État
exports.getStatisticsForEtat = async (req, res) => {
  try {
    const etat = req.params.etat.toLowerCase();
    const numberOfArticles = await ItemModel.countDocuments({ etat });
    const totalStock = await ItemModel.aggregate([
      {
        $match: { etat, quantite: { $exists: true } }
      },
      {
        $group: {
          _id: null,
          totalStock: {
            $sum: { $toInt: '$quantite' }
          }
        }
      }
    ]);

    const numberOfLowStockArticles = await ItemModel.countDocuments({
      etat,
      $expr: {
        $lt: [ { $toInt: "$quantite" }, 5 ]
      }
    });

    res.status(200).json({
      numberOfArticles: `${numberOfArticles}`,
      totalStock: totalStock[0]?.totalStock || 0,
      numberOfLowStockArticles: `${numberOfLowStockArticles}` || 0
    });
  } catch (error) {
    console.error(`Erreur lors du calcul des statistiques pour l'état ${req.params.etat} :`, error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

