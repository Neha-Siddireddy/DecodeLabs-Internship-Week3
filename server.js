const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const Coffee = require("./models/Coffee");

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Coffee Shop Database API Running");
});

app.post("/coffees", async (req, res) => {
    try {
        const coffee = await Coffee.create(req.body);
        res.status(201).json(coffee);
    } catch (error) {
        res.status(500).json(error);
    }
});

app.get("/coffees", async (req, res) => {
    try {
        const coffees = await Coffee.find();
        res.json(coffees);
    } catch (error) {
        res.status(500).json(error);
    }
});

app.get("/coffees/:id", async (req, res) => {
    try {
        const coffee = await Coffee.findById(req.params.id);
        res.json(coffee);
    } catch (error) {
        res.status(500).json(error);
    }
});

app.put("/coffees/:id", async (req, res) => {
    try {
        const coffee = await Coffee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(coffee);
    } catch (error) {
        res.status(500).json(error);
    }
});

app.delete("/coffees/:id", async (req, res) => {
    try {
        await Coffee.findByIdAndDelete(req.params.id);

        res.json({
            message: "Coffee Deleted"
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});