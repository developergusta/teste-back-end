import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid"

@Entity("users")
export class User {
    @PrimaryColumn()
    user_id: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    nick_name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    phone_number: string;

    @Column()
    birth_date: Date;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    constructor() {
        if(!this.user_id){
            this.user_id = uuid();
        }
    }
}