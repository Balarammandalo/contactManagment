const { validateContact, Contact } = require("../model/ContactSchema");
// const authMiddleware = require("../middleWare/authMiddle");

const router = require("express").Router();

router.post("/contact", async (req, res) => {
  const { error } = validateContact(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { name, address, email, phone } = req.body;

  try {
    const newContact = new Contact({
      name,
      address,
      email,
      phone,
      postedBy: req.user,
    });
    const result = await newContact.save();
    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(err);
  }
});

router.put("/contactname", async (req, res) => {
  const { id } = req.body
  
    if (!id) return res.status(400).json({ error: "no id specified." });

    try {
      const contact = await Contact.findOne({ _id: id });
        if (!contact) {
            return res.status(404).json({ error: "Contact not found" });
        }
        const updatedData = { ...req.body };
        const result = await Contact.findOneAndUpdate({_id: id }, updatedData, { new: true, });
        return res.status(200).json({result });
    } catch (err) {
        console.log(err);
    }
});

router.get("/contactname", async (req, res) => {
  try {
    const myContacts = await Contact.find().select("-password");

     return res.send(myContacts);
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/contact/:id", async (req, res) => {
  const { id } = req.params;
  
  if (!id) return res.status(400).json({ error: "no id specified." });
  try {
    const contact = await Contact.findById(id).select("-password");

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    return res.status(200).json({ contact });
    
  } catch (err) {
    console.log("error ");
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "no id specified." });

  try {
    const contact = await Contact.findByIdAndDelete({ _id: id });
    if (!contact) return res.status(400).json({ error: "no contact found" });
    const myContacts = await Contact.find().select("-password");
    return res.json({ myContact :  myContacts.reverse() });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;


