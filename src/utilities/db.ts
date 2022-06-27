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
import { data } from './mock';

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

export class Data extends Model<
  InferAttributes<Data>,
  InferCreationAttributes<Data>
> {
  declare college: string;

  declare address: string;

  declare university: string;

  declare district: string;

  declare date: Date;

  declare students: number;

  declare id: CreationOptional<number>;
}

Data.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    college: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    university: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    students: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'data',
    sequelize,
  }
);

// console.log('Populating db');
// Data.bulkCreate(data);
