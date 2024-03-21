const Contact = require('../../models/Contact/contact');
const nodemailer = require('nodemailer');
let {EMAIL,PASSWORD}=require('../../config/config.js')

// Send a mail to the new created contact
// Function to send email

const sendEmail = async (contact) => {
    try {
        let config={
            service:'gmail',
            auth:{
                user:EMAIL,
                pass:PASSWORD
        
            }
        }
        let transporter = nodemailer.createTransport(config)
       
      
        const info = await transporter.sendMail({
                    from: EMAIL, // sender address
                    to: contact.email, // list of receivers
                    subject: "Hello ✔", // Subject line
                    text: "Hello world?", // plain text body
                    html: '<p>Shubham HI</p>', // html body
        });
         
        
        
        console.log("Message sent: %s", info.messageId,nodemailer.getTestMessageUrl(info));
          // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email

        console.log('Email sent successfully');
    } catch (error) {
        // console.log('Error sending email:', error);
    }
};

// Create a new contact
const createContact = async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        await sendEmail(contact);
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
        // const contact = await Contact.findById(req.params.id);
        const contact = await Contact.find()
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
        const contact = await Contact.findByIdAndDelete(req.body.id);
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