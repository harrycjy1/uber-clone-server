import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column
} from "typeorm";

import Chat from "./Chat";
import User from "./User";

@Entity()
class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  text: string;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(type => User, user => user.messages)
  user: User;

  @Column({ nullable: true })
  chatId: number;

  @ManyToOne(type => Chat, chat => chat.messages)
  chat: Chat;

  @CreateDateColumn()
  createdAt: string;
  @UpdateDateColumn()
  updatedAt: string;
}

export default Message;
