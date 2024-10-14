import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Day } from "./day.entity";

@Entity()
export class Score {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.scoreHistory)
    user: User;

    @ManyToOne(() => Day, (day) => day.scoreHistory)
    day: Day;

    @Column()
    points: number;

    @Column()
    reason: string;

    @CreateDateColumn()
    earnedAt: Date;
}
