import {
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Column,
} from "typeorm";
import { Calendar } from "./calendar.entity";
import { Content } from "./content.entity";
import { DaysOpening } from "./days-opening.entity";

@Entity()
export class Day {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Calendar)
    calendar: Calendar;

    @Column()
    dayNumber: number;

    @OneToMany(() => Content, (content) => content.day)
    contents: Content[];

    @OneToMany(() => DaysOpening, (days) => days.day)
    daysOpening: DaysOpening[];
}
