'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Recipe.belongsTo(models.Chef, {foreignKey: 'chefId',as: 'chef',});
      Recipe.hasMany(models.Like, { as: "like",foreignKey: 'recipeId' });

    }
  }
  Recipe.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    ingredients: DataTypes.TEXT,
    instructions: DataTypes.TEXT,
    image: DataTypes.STRING
    
  }, {
    sequelize,
    modelName: 'Recipe',
  });
  return Recipe;
};