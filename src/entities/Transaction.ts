import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./Client";

export enum TransactionTypes{
    DEPOSITE = "deposite",
    WITHDROW = "withdrow"
}

@Entity("transaction")
export class Transaction extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: TransactionTypes
    })
    type: string;

    @Column({
        type: "numeric"
    })
    amount: number;

    @ManyToOne(
        () => Client,
        cllent => cllent.transactions ,
        {
            onDelete: "CASCADE"
        }
    )
    @JoinColumn({
        name: 'client_id'
    })
    client: Client
}