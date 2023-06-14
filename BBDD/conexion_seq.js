import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('postgres://alvaro:Alvaro123@10.2.21.115:5432/pruba_alvaro', {
  dialect: 'postgres',
})

export default sequelize