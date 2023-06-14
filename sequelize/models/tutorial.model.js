function tutorials(sequelize, Sequelize) {
    const Tutorial = sequelize.define("tutorial", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    console.log("-"+typeof Tutorial)
    return Tutorial;
  };

  

export default tutorials