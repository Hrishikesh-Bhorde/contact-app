const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const { MongoClient } = require("mongodb");

// @desc Get all contacts
// @ route GET /api/contacts
//@acess Private

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });

  if (contacts.length == 0) {
    console.log("No contacts found");
  } else {
    console.log("Fetched Contacts", contacts);
  }
  res.status(200).json(contacts);
});

// @desc Get specific contact
// @ route GET /api/contacts/:id
//@acess Private

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  res.status(200).json({ message: "Contact Found", contact });
});

// @desc Create contact
// @ route POST /api/contacts
//@acess Private

//201 : for created / added
const createContact = asyncHandler(async (req, res) => {
  console.log("This is the req body:", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

// @desc Update contact
// @ route PUT /api/contacts/:id
//@acess Private

const updateContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json({ message: "Contact Updated", updatedContact });
});

// @desc delete contact
// @ route DELETE /api/contacts/:id
//@acess Private

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  res.status(200).json({ message: "Contact Deleted", contact });
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
