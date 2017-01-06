const router = require('express').Router()
const handleError = require('../../apiCommon').handleError
const Contact = require('../models/contact')

// CONTACTS API ROUTES BELOW
/*  "/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

router.get("/", (req, res) => {
  Contact.find({}, (err, docs) => {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.")
    } else {
      res.status(200).json(docs)
    }
  })
})

router.post("/", (req, res) => {
  const newContact = req.body
  newContact.createDate = new Date()

  if (!(req.body.firstName || req.body.lastName)) {
    handleError(res, "Invalid user input", "Must provide a first or last name.", 400)
  } else {
    const contact = new Contact(newContact)
    contact.save((err, doc) => {
      if (err) {
        handleError(res, err.message, "Failed to create new contact.")
      } else {
        res.status(201).end()
      }
    })
  }
})

/*  "/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

router.get("/:id", (req, res) => {
  Contact.findById(req.params.id, (err, doc) => {
    if (err) {
      handleError(res, err.message, "Failed to get contact")
    } else {
      res.status(200).json(doc)
    }
  })
})

//TODO: NOT working...fix this..
router.put("/:id", (req, res) => {
  const updateDoc = req.body
  delete updateDoc._id

  Contact.findByIdAndUpdate(req.params.id, {$set:updateDoc}, {new: true}, (err, doc) => {
    console.log(-4, err, updateDoc, doc)
    if (err) {
      handleError(res, err.message, "Failed to update contact")
    } else {
      res.status(204).end()
    }
  })
})

router.delete("/:id", (req, res) => {
  Contact.findByIdAndRemove(req.params.id, (err, result) => {
    if (err) {
      handleError(res, err.message, "Failed to delete contact")
    } else {
      res.status(204).end()
    }
  })
})

module.exports = router