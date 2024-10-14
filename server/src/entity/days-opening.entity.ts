import {
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    Index,
} from "typeorm";
import { Day } from "./day.entity";

@Entity()
@Index(["userUuid", "day"], { unique: true })
export class DaysOpening {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Day, (day) => day.daysOpening)
    day: Day;

    @Column()
    userUuid: string;

    @CreateDateColumn()
    openAt: Date;
}
