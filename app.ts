import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
// import crypto from "crypto"

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    findUser(email: string): User {
        return this.users.find(user => user.email === email)
    }
    findRent(bikeId: string): Rent{
        return this.rents.find(rent => rent.bike.id === bikeId)
    }
    findBike(bikeId: string): Bike{
        return this.bikes.find(bike => bike.id === bikeId)
    }
    registerUser(user: User): void {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.')
            }
        }
        // user.id = crypto.randomUUID()
        this.users.push(user)
    }
    removeUser(email: string): void {
        let index : number
        index = this.users.indexOf(this.findUser(email))
        this.users.splice(index,1)
    }
    registerBike(bike: Bike): void{
        for(const rBike of this.bikes){
            if(rBike.id === bike.id) throw new Error('Duplicate bike')
        }
        // bike.id = crypto.randomUUID()
        this.bikes.push(bike)
    }

    rentBike(bikeId: string, user: User, dateFrom: Date, dateTo: Date): void {
        let newRent : Rent
        const verBike : Bike = this.findBike(bikeId)
        const verUser : User = this.findUser(user.email)
        if(verBike == undefined || verUser == undefined){
            throw new Error('User or bike not registered.')
        }
        newRent = Rent.create(this.rents,verBike,user,dateFrom,dateTo)
        this.rents.push(newRent)
        console.log("rent done")
    }
    returnBike(bikeId: string, dateReturned: Date): void{
        const verBike : Bike = this.findBike(bikeId)
        if(verBike == undefined){
            throw new Error('Bike not registered.')
        }
        const rents : Rent[] = this.rents.filter(rent => rent.bike.id === bikeId)
        let rentReturn = rents.find(rent => rent.dateReturned === undefined)
        rentReturn.dateReturned = dateReturned
        console.log('bike returned')
    }

    listUsers(): void {
        for(let x in this.users){
            console.log("Name: ",this.users[x].name)
            console.log("email: ",this.users[x].email)
            console.log("id: ",this.users[x].id)
        }
        console.log('\n')
    }

    listRents():void{
        for(let x in this.rents){
            console.log("Bike rented: ",this.rents[x].bike.name)
            console.log("User: ",this.rents[x].user.name)
            console.log("BikeId: ",this.rents[x].bike.id)
            console.log("Start date: ",this.rents[x].dateFrom)
            console.log("End date: ",this.rents[x].dateTo)
            if(this.rents[x].dateReturned) console.log("Returned date: ",this.rents[x].dateReturned)
        }
        console.log('\n')
    }
    listBikes():void{
        for(let x in this.bikes){
            console.log("Bike name: ",this.bikes[x].name)
            console.log("Type: ",this.bikes[x].type)
            console.log("Body size: ",this.bikes[x].bodySize)
            console.log("max Load: ",this.bikes[x].maxLoad)
            console.log("Rate: ",this.bikes[x].rate)
            console.log("Descryption: ",this.bikes[x].description)
            console.log("Ratings: ",this.bikes[x].ratings)
            console.log("Bike id: ",this.bikes[x].id)
        }
        console.log('\n')
    }
    userAuthentication(userId: string, password: string): boolean{
        let authUser: User = this.users.find(user => user.id == userId)
        if(authUser == undefined || authUser.password != password) return false
        else return true
    }
}
