const db = require('../../models');
const mongoose = require('mongoose')

module.exports = {
  createEntry }

  async function createEntry(req, res) {
    try {
      const newNote = new db.Journal(req.body)
      const note = await db.Journal.create(newNote)
      return res.json(note)
    } catch (error) {
      res.status(422).json({ msg: 'Error creating Journal Entry'})
    }
  }
