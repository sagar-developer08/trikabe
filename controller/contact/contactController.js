const Contact = require('../../models/Contact/contact');

// Create a new contact
const createContact = async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).json(contact);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create contact' });
    }
};

// Get all contacts
const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get contacts' });
    }
};

// Get a single contact by ID
const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.json(contact);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get contact' });
    }
};

// Update a contact by ID
const updateContactById = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.json(contact);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update contact' });
    }
};

// Delete a contact by ID
const deleteContactById = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete contact' });
    }
};

module.exports = {
    createContact,
    getAllContacts,
    getContactById,
    updateContactById,
    deleteContactById,
};