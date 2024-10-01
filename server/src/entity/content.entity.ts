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
        enum: ["image", "video", "music", "quote", "game", "recipe", "tip"],
    })
    type: string;

    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true, type: "text" })
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
