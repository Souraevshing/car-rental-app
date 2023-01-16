import { Exclude } from 'class-transformer'
import { Report } from '../reports/report.entity'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  OneToMany,
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column()
  password: string

  //if user is admin or not
  @Column({ default: true })
  admin: boolean

  /** Since one user may have more than 1 reports,
   * therefore initializing reports table with
   * OneToMany type of association
   * All the reports tied to this user will be accessed with: user.reports
   * The first argument Report is to inform nest/typescript the return type of ManyToOne(). Here,  single User will return array of reports
   * */
  @OneToMany(() => Report, (report) => report.user)
  reports: Report[]

  @AfterInsert()
  logInsert() {
    console.log(`Inserted user with id ${this.id}`)
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated user with id ${this.id}`)
  }

  @AfterRemove()
  logRemove() {
    console.log(`Remove user with id ${this.id}`)
  }
}
