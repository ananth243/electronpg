import {
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
  DataTypes,
} from 'sequelize';
import pg from 'pg';
import { DB, USERNAME, PASSWORD, DIALECT } from './keys';

const sequelize =
  DIALECT === 'mysql'
    ? new Sequelize(DB, USERNAME, PASSWORD, {
        dialect: 'mysql',
      })
    : new Sequelize(DB, USERNAME, PASSWORD, {
        dialect: 'postgres',
        dialectModule: pg,
      });

async function connectDb() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    sequelize.sync({ alter: true });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

connectDb();

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare name: string;

  declare id: CreationOptional<number>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'users',
    sequelize,
  }
);
