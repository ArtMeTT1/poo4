import { App } from "./app";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

const bike = new Bike('mountain bike', 'mountain',123, 500, 100.5, 'desc', 5, [],'bikeId')
const user = new User('Maria', 'maria@mail.com', '1234')
const today = new Date()
const rock = new User('manoel','manoel@amor','senha')
const twoDaysFromToday = new Date()
twoDaysFromToday.setDate(twoDaysFromToday.getDate() + 2)
const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
const sevenDaysFromToday = new Date()
sevenDaysFromToday.setDate(sevenDaysFromToday.getDate() + 7)
const rent1 = Rent.create([], bike, user, today, twoDaysFromToday)
const user2 = new User('Maria Clara', 'mariarrrr@mail.com', '3123')
const app = new App()

app.registerUser(rock)
app.registerUser(user2)
app.registerUser(user)
// app.listUsers()
app.registerBike(bike)
app.rentBike('bikeId',user,today,twoDaysFromToday)
// app.returnBike('bikeId',sevenDaysFromToday)
app.listRents()

//app.rentBike(bike,user2,today,twoDaysFromToday)
//console.log(app.findRent('567'))
//console.log(app.findUser('maria@mail.com'))
//app.removeUser('maria@mail.com')
//console.log(app.findUser('maria@mail.com'))

