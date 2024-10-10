import {
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    Index,
} from "typeorm";
import { Day } from "./day.entity";
import { User } from "./user.entity";

@Entity()
@Index(["userUuid", "day"], { unique: true })
export class DaysOpening {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Day, (day) => day.daysOpening)
    day: Day;

    // @ManyToOne(() => User, (user) => user.daysOpening)
    // user: User;

    @Column()
    userUuid: string;

    @CreateDateColumn()
    createdAt: Date;
}
