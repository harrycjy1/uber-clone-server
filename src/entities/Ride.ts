import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { rideStatus } from "src/types/types";

@Entity()
class Ride extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: "text",
    enum: ["ACCEPTED", "FINISHED", "CANCELED", "REQUESTING", "ONROUTE"]
  })
  status: rideStatus;
  @Column({ type: "text" })
  pickUpAddress: string;
  @Column({ type: "double precision", default: 0 })
  pickUpLat: number;
  @Column({ type: "double precision", default: 0 })
  pickUpLng: number;
  @Column({ type: "text" })
  dropOffAddress: string;
  @Column({ type: "double precision", default: 0 })
  dropOffLat: number;
  @Column({ type: "double precision", default: 0 })
  dropOffLng: number;
  @Column({ type: "text" })
  price: string;
  @Column({ type: "text" })
  distance: string;
  @Column({ type: "text" })
  duration: string;

  @CreateDateColumn()
  createdAt: string;
  @UpdateDateColumn()
  updatedAt: string;
}

export default Ride;