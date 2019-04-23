import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from "typeorm";
import User from "./User";

@Entity()
class Place extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "text" })
  name: string;
  @ManyToOne(type => User, user => user.places)
  user: User;
  @Column({ type: "double precision", default: 0 })
  lat: number;
  @Column({ type: "double precision", default: 0 })
  lng: number;
  @Column({ type: "text" })
  address: string;
  @Column({ type: "boolean", default: false })
  isFav: boolean;

  //user스키마에서 id를 자동으로 가져와 입력  //typeORM의 기능 //relationId
  @Column({ nullable: true })
  userId: number;

  @CreateDateColumn()
  createdAt: string;
  @UpdateDateColumn()
  updatedAt: string;
}

export default Place;
