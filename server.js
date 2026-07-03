const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const fs = require("fs");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Read db.json
function readData() {
    const data = fs.readFileSync("./Amzeno.json");
    return JSON.parse(data);
}
function writeData(data){
    fs.writeFileSync("./Amzeno.json",JSON.stringify(data,null,2))
}

// Swagger Configuration
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Amzeno API",
            version: "1.0.0",
            description: "Amzeno APIs using Node.js"
        },
        servers: [
            {
                url: "http://localhost:3001"
            }
        ]
    },
    apis: ["./server.js"]
};

const swaggerSpec = swaggerJsdoc(options);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /meetings:
 *   get:
 *     summary: Get all locations
 *     responses:
 *       200:
 *         description: Success
 */
app.get("/meetings", (req, res) => {
    const Amzeno = readData();
    res.json(Amzeno.meetings);
});

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all bus schedules
 *     responses:
 *       200:
 *         description: Success
 */
app.get("/events", (req, res) => {
    const Amzeno = readData();
    res.json(Amzeno.events);
});

/**
 * @swagger
 * /newusers:
 *   get:
 *     summary: Get booked seats
 *     responses:
 *       200:
 *         description: Success
 */

app.get("/newusers", (req, res) => {
    const Amzeno = readData();
    res.json(Amzeno.newusers);
});

/**
 * @swagger
 * /Reminder:
 *   get:
 *     summary: Get Reminderdata
 *     responses:
 *       200:
 *         description: Success
 */

app.get("/Reminder", (req, res) => {
    const Amzeno = readData();
    res.json(Amzeno.Reminder);
});

/**
 * @swagger
 * /meetings:
 *   post:
 *     summary: Add a new meeting
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: User created
 */
app.post("/meetings",(req,res)=>{
    const Amzeno_db=readData();
     const newmeeting={
        id:Date.now().toString(),
        ...req.body
     };
     Amzeno_db.meetings.push(newmeeting);

     writeData(Amzeno_db);

     
    res.status(201).json({
        message: "User Added Successfully",
        data: newmeeting
    });
});

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Add a new events
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: User created
 */
app.post("/events",(req,res)=>{
    const Amzeno_db=readData();
     const newevents={
        id:Date.now().toString(),
        ...req.body
     };
     Amzeno_db.events.push(newevents);

     writeData(Amzeno_db);

     
    res.status(201).json({
        message: "User Added Successfully",
        data: newevents
    });
});

/**
 * @swagger
 * /Reminder:
 *   post:
 *     summary: Add a new reminder
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: User created
 */
app.post("/Reminder",(req,res)=>{
    const Amzeno_db=readData();
     const newReminder={
        id:Date.now().toString(),
        ...req.body
     };
     Amzeno_db.Reminder.push(newReminder);

     writeData(Amzeno_db);

     
    res.status(201).json({
        message: "User Added Successfully",
        data: newReminder
    });
});

 /** @swagger
 * /weeklychart:
 *   post:
 *     summary: Add a new reminder
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: User created
 */
app.post("/weeklychart",(req,res)=>{
    const Amzeno_db=readData();
     const newweeklychart={
        id:Date.now().toString(),
        ...req.body
     };
     Amzeno_db.weeklychart.push(newweeklychart);

     writeData(Amzeno_db);

     
    res.status(201).json({
        message: "User Added Successfully",
        data: newweeklychart
    });
});

/**
 * @swagger
 * /Reminder/{id}:
 *   delete:
 *     summary: Delete a meeting
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Meeting deleted successfully
 */
app.delete("/Reminder/:id", (req, res) => {

    const Amzeno_bd = readData();

    const id = req.params.id;

    const index = Amzeno_bd.Reminder.findIndex(Reminder => Reminder.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Meeting not found"
        });
    }

    Amzeno_bd.Reminder.splice(index, 1);

    writeData(Amzeno_bd);

    res.json({
        message: "Meeting deleted successfully"
    });

});


/**
 * @swagger
 * /meetings/{id}:
 *   delete:
 *     summary: Delete a meeting
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Meeting deleted successfully
 */
app.delete("/meetings/:id", (req, res) => {

    const Amzeno_bd = readData();

    const id = req.params.id;

    const index = Amzeno_bd.meetings.findIndex(meeting => meeting.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Meeting not found"
        });
    }

    Amzeno_bd.meetings.splice(index, 1);

    writeData(Amzeno_bd);

    res.json({
        message: "Meeting deleted successfully"
    });

});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Swagger UI: http://localhost:${PORT}/swagger`);
});