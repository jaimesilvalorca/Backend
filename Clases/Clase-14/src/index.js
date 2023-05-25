import mongoose from "mongoose";
import orderModel from "./models/order.model.js";

const main = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017', { dbName: 'pizzaday' })
    console.log('Db Connected')

    // const result = await orderModel.insertMany(
    //     [
    //         {name:'Pepperoni',size:'small',price:19,qty:10},
    //         {name:'Pepperoni',size:'medium',price:22,qty:20},
    //         {name:'Pepperoni',size:'large',price:30,qty:30},
    //         {name:'Cheese',size:'small',price:19,qty:10},
    //         {name:'Cheese',size:'medium',price:19,qty:15},
    //         {name:'Cheese',size:'large',price:19,qty:40},
    //         {name:'Hawaiana',size:'small',price:19,qty:10},
    //         {name:'Hawaiana',size:'medium',price:19,qty:20}
    // { name: 'Cheese', size: 'medium', price: 19, qty: 15 },
    // { name: 'Pepperoni', size: 'medium', price: 22, qty: 58 }
    //     ]
    // )

    const orders = await orderModel.aggregate([
        { $match: { size: 'medium' } }, //este match es un find pero para agregar mas acciones
        {
            $group: { //va operar con los resultados del match //como id pon el nombre del objeto // en totalqty se agrega sum y suma la cantidad qty
                _id: "$name",
                totalqty: { $sum: "$qty" },
                total: { $sum: "$price" }
            }
        },
        {
            $sort: {
                totalqty: -1
            }
        },
        {
            $group: { _id: 1, orders: { $push: "$$ROOT" } }
        },
        {
            $project:
            {
                "_id": 0,
                orders: "$orders"
            }
        },
        {
            $merge: { into: 'reports' }
        }

    ])
    console.log(orders)
}

main()