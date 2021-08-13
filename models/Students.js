'use strict';

module.exports= (sequelize, Datatypes) => {
  return sequelize.define('students', {
    id:{
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    student_id:{
      type: Datatypes.STRING,
      required: true,
      allowNull: false,
      unique: true
    },
    lunch_id:{
      type: Datatypes.STRING,
      required: true,
      allowNull: false,
      unique: true
    },
    first_name:{
      type: Datatypes.STRING,
      isAlpha: true,
      required: true,
      allowNull: false,
    },
    last_name:{
      type: Datatypes.STRING,
      isAlpha: true,
      required: true,
      allowNull: false,
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
