import {
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { Day } from "./day.entity";

@Entity()
export class Content {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Day, (day) => day.contents)
    day: Day;

    @Column({
        type: "enum",
        enum: ["image", "idea", "music", "quote", "game", "recipe", "anecdote"],
    })
    type: string;

    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true, type: "text" })
    content1: string;

    @Column({ nullable: true, type: "text" })
    content2: string;

    @Column({ nullable: true, type: "text" })
    content3: string;

    @Column({ nullable: true, type: "text" })
    content4: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
