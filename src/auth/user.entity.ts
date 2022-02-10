import{Entity , PrimaryGeneratedColumn , Column} from 'typeorm'

@Entity()
export class user{
    @PrimaryGeneratedColumn('uuid')
    id:string ;
    @Column()
    username: string;
    @Column()
    password: string;
    
}