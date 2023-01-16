import { User } from '../users/user.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number

  /** column for admin, initially set to false */
  @Column({ default: false })
  approved: boolean

  @Column()
  price: number

  @Column()
  make: string

  @Column()
  model: string

  @Column()
  year: string

  @Column()
  lng: number

  @Column()
  lat: number

  @Column()
  mileage: number

  /** Since single user may have many reports, therefore using ManyToOne type of association.
   * This decorator will make a change to the report table by assigning new column user_id
   * User who created the report will be accessed with: report.user
   *
   * The first argument User is to inform nest/typescript the return type of ManyToOne(). Here, all the reports return single User
   */
  @ManyToOne(() => User, (user) => user.reports)
  user: User
}
