const express = require('express');
const router = express.Router();
const GuestModel = require('../models/guestmodels');

//POST
router.post('/', async(req, res) => {
    try {
        const guest = await GuestModel.create({
            Guest_type: req.body.Guest_type,
            EntryDetails: {
                GuestID: req.body.GuestID,
                Date: req.body.Date,
                CheckinTime: req.body.CheckinTime,
                CheckoutTime: req.body.CheckoutTime,
                Transport_type: req.body.Transport_type,
                PlateNum: req.body.PlateNum
            },
        });
        res.json(guest)
    }   catch (err) {
            res.status(500).json({
                message: "Guest cannot be stored"
            })
    }
});

//GET guest by ID
router.get("/:id", async (req, res) =>{
    try{
        const result = await GuestModel.findById(req.params.id)
        
        res.json(result)
    } catch (err){
        res.status(500).json({
            message: "Guest cannot be found!"
        })
    }
});

//GET all guest
router.get("/", async (req, res, ) =>{
    try{
        const result = await GuestModel.find()
        
        res.json(result)
    } catch (err){
        res.status(500).json({
            message: "Guest cannot be found!"
        })
    }
});

//UPDATE guest
router.put("/:id", async(req, res) => {
    try{
        const guest = await GuestModel.findOneAndUpdate({_id: req.params.id}, {
            Guest_type: req.body.Guest_type,
            EntryDetails: {
                GuestID: req.body.GuestID,
                Date: req.body.Date,
                CheckinTime: req.body.CheckinTime,
                CheckoutTime: req.body.CheckoutTime,
                Transport_type: req.body.Transport_type,
                PlateNum: req.body.PlateNum
        }}, {
            new: true,
            useFindAndModify: false,
            upsert: true
        })

        res.json(guest)
    } catch(err) {
        res.status(500).json({
            message: "Guest cannot be updated"
        })
    }
});

//DELETE
router.delete("/:id", async (req, res) => {
    try{
       const result = await GuestModel.deleteOne({_id: req.params.id})

       res.json({
           //error: false,
           deleted_count: result.deletedCount
       })
    } catch(err) {
        res.status(500).json({
            message: "Deleted error!"
        })
    }
});
        
module.exports = router;
