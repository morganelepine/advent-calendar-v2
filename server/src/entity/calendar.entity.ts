import {
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Day } from "./day.entity";

@Entity()
export class Calendar {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Day, (day) => day.calendar)
    days: Day[];

    @Column()
    title: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
