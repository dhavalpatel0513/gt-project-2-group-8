module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    listingagent: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    finalprice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    propertydetail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    city: {
      type: DataTypes.STRING,
      defaultValue: "atlanta"
    }
  });
  return Post;
};
