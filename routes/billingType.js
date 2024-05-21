const express = require("express");
const router = express.Router();
const db = require('./../db.js');
const redisClient = require('./../rdb.js');



router.post('/billing', async (req, res) => {
    try {
        let userId = req.body.userId;
        if (userId != 1 && userId != 8 && userId != 847) {
            const key = `user:${userId}:billing_type`;
            let billingType = await redisClient.get(key);
            if (!billingType) {
                const sql = `SELECT billing_type FROM ng_user WHERE id = ?`;
                const [results, fields] = await db.execute(sql, [userId]);

                billingType = results[0].billing_type;
                console.log('From DB', billingType);
                await redisClient.set(key, billingType, { EX: 300 });
                res.json({ billingType });
            } else {
                // If data is present in Redis, use cached data
                console.log('From Redis', billingType);
                res.json({ billingType });
            }
        } else {
            res.json({ billingType: 3 });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
