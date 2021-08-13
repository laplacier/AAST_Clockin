'use strict';

module.exports= (sequelize, Datatypes) => {
  return sequelize.define('punches', {
    id:{
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    //fk in staff table
    staff_id:{
      type: Datatypes.INTEGER,
      required: true,
      allowNull: false
    },
    updated_at:{ type: Datatypes.DATE },
    deleted_at:{ type: Datatypes.DATE }
  },
    {
      underscored: true,
      paranoid: true,
      freezeTableName: true
    });
};
