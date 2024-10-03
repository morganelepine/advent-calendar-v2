import {
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Column,
} from "typeorm";
import { Calendar } from "./calendar.entity";
import { Content } from "./content.entity";

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

    @Column({ default: false })
    isOpen: boolean;

    @Column({ nullable: true })
    openAt: Date;
}
