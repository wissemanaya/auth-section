import{Entity , PrimaryGeneratedColumn , Column} from 'typeorm'

@Entity()
export class user{
    @PrimaryGeneratedColumn('uuid')
    id:string ;
    @Column({unique: true})
    username: string;
    @Column()
    password: string;
    
}