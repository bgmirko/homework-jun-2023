import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  uuid: string;

  @Column
  fullName: string;

  @Column
  password: string;

  @Column
  email: string;

  @Column
  resetToken: string;
}
