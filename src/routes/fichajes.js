const express = require('express');
const router = express.Router();

const pool = require('../database');
const {isLoggedIn} = require('../lib/auth');

router.get('/add', isLoggedIn,async (req, res)=>{
    const fichaje = await pool.query('SELECT * FROM fichaje WHERE user_id = ? ORDER BY clock_in DESC LIMIT 1', [req.user.id]);
    res.render('fichajes/add',{fichaje});
});

router.post('/add', isLoggedIn, async (req, res)=>{
    const newLink = {
        user_id: req.user.id
    };
    await pool.query('INSERT INTO fichaje set ?', [newLink]);
    req.flash('success', 'Fichada entrada correctamente.');
    res.redirect('/fichajes/add');
});

router.get('/', isLoggedIn, async (req, res)=>{
    const fichajes = await pool.query('SELECT * FROM fichaje WHERE user_id = ? ORDER BY clock_in DESC', [req.user.id]);
    res.render('fichajes/list', {fichajes});
    
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params;
    await pool.query('UPDATE fichaje set clock_out = current_timestamp, salida = 0 WHERE ID = ?', [id]);
    req.flash('success', 'Fichada salida correctamente.');
    res.redirect('/fichajes/add');
    
});

module.exports = router;