'use strict';

module.exports= (sequelize, Datatypes) => {
  return sequelize.define('lunches', {
    id:{
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    //fk in students table
    student_id:{
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
