import {ObjectID} from "mongodb";

import {Entity, PrimaryColumn, Column, ObjectIdColumn} from "typeorm";

@Entity()
export class User {

    @ObjectIdColumn() 
    id?: ObjectID;

    @Column("text")
    firstName: string;

    @Column("text")
    lastName: string;

    @Column()
    age: number;

}
