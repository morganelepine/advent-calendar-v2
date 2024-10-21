import { Entity, OneToMany, PrimaryGeneratedColumn, Column } from "typeorm";
import { Content } from "./content.entity";
import { DaysOpening } from "./days-opening.entity";
import { Score } from "./score.entity";

@Entity()
export class Day {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dayNumber: number;

    @Column()
    background: string;

    @Column()
    width: string;

    @Column()
    height: string;

    @Column()
    color: string;

    @Column()
    textColor: string;

    @Column()
    image: string;

    @Column("float")
    aspectRatio: number;

    @Column()
    quote: string;

    @Column()
    quoteAuthor: string;

    @Column()
    quoteSource: string;

    @OneToMany(() => Content, (content) => content.day)
    contents: Content[];

    @OneToMany(() => DaysOpening, (days) => days.day)
    daysOpening: DaysOpening[];

    @OneToMany(() => Score, (score) => score.day)
    scoreHistory: Score[];
}
