const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { rename } = require("fs");
const app = express();
const port = 3001;


mongoose.connect("/*mongo db link*/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




const FormData = mongoose.model("FormData", {
  _id: {type: String , unique: true },
  engineer: String,
  sourceIP: Number,
  sourcePort: Number,
  destinationIP: Number,
  destinationPort: Number,
  dateAndTime: String,
  engineerName:String,
  offenceID: Number,
  incidentType: String,
  incidentTime: String,
  shiftName: String,
  escalatedTime:String,
  lastUsername: String,
  closeTime:String,
  location:String,
  sla:String,
  offenceDesc: String,
  resolvedBy: String,
  comments: String,
  response:String,
  handledBy: String,
  status: String,
  falsePositive: String,
  ticketCloserUpdate:String
});
const SophosFormData = mongoose.model("SophosFormData", {
  _id:{type: String , unique: true },
  engineer: String,
  location: String, 
  escalatedTime: String, 
  escalatedBy:String, 
  severity: String, 
  userDetails: String, 
  deviceName: String, 
  sla: String, 
  firstTimeToResponse: String, 
  responseStatus:String,
  escalatedTo: String,
  closedDateAndTime:String,
  resolution:String,
  itVal:String,
  dateAndTime: String,
  alertCategory: String,
  alertTime: String,
  shiftName: String,
  offenceDesc: String,
  comments: String,
  status:String
});
const CrowdstrikeFormData = mongoose.model("CrowdstrikeFormData", {
  _id: {type: String , unique: true },
  engineer: String,
  hostName: String,
  OS: String,
  dateAndTime: String,
  userName: String,
  severity: String,
  objective: String,
  tacticAndTech: String,
  techID: Number,
  cmdLine:String,
  filePath:String,
  escalatedBy: String,
  comments: String,
  localIP: Number,
  status: String
});

const UserFormData = mongoose.model("userFormData", {
  regname: {type: String , unique: true },
  regemail: String,
  regpassword: String,
  role: String

});
app.use(express.json());
app.put('/api/update-status/:query', async (req, res) => {
  const query = req.params.query;
  const { status } = req.body;
  const [prefix, id] =query.split(":").map(String);
  let formData;
  try {
    if(prefix==="QRADAR"){
     formData = await FormData.findOne({ _id: id });
    }else if(prefix==="SOPHOS"){
       formData = await SophosFormData.findOne({ _id: id });

    }else if(prefix==="CROWDSTRIKE"){
       formData = await CrowdstrikeFormData.findOne({ _id: id });

    }
    if (!formData) {
      return res.status(404).json({ message: "Form data not found" });
    }
    formData.status = status;
    await formData.save();
    res.status(200).json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error("Error searching form data:", error);
    res.status(500).json({ error: "Error searching form data" });
  }
});
// Assuming you have the route for updating status as follows:
app.put('/api/update-status/:tool/:id', async (req, res) => {
  const tool = req.params.tool;
  const id = req.params.id;
  const { status } = req.body;

  try {
    let formData;

    switch (tool) {
      case 'QRADAR':
        formData = await FormData.findOne({ _id: id });
        break;
      case 'SOPHOS':
        formData = await SophosFormData.findOne({ _id: id });
        break;
      case 'CROWDSTRIKE':
        formData = await CrowdstrikeFormData.findOne({ _id: id });
        break;
      default:
        return res.status(400).json({ message: 'Invalid tool specified' });
    }

    if (!formData) {
      return res.status(404).json({ message: 'Form data not found' });
    }

    formData.status = status;
    await formData.save();

    res.status(200).json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ error: 'Error updating status' });
  }
});

app.post("/api/users", async (req, res) => {

  
    try {
      const hashedPassword = await bcrypt.hash(req.body.regpassword, 10);
      const userFormData = new UserFormData({
        regname: req.body.regname, 
        regemail: req.body.regemail,
        regpassword: hashedPassword,
        role: req.body.role
      });
      await userFormData.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error registering user" });
    }
  });
app.get("/api/search/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const formData = await FormData.findOne({ _id: id });

    if (!formData) {
      return res.status(404).json({ message: "Form data not found" });
    }

    res.status(200).json(formData);
  } catch (error) {
    console.error("Error searching form data:", error);
    res.status(500).json({ error: "Error searching form data" });
  }
});

app.get('/api/search-data/:query', async (req, res) => {
  const searchQuery = req.params.query;
  // const prefix = searchQuery.substring(0, 2); 
  // const id = searchQuery.substring(3);
  const [prefix, id] =searchQuery.split(":").map(String);
  try {
    let result;
    if (prefix === 'QRADAR') {
      result = await FormData.findOne({ _id: id });
    } else if (prefix === 'SOPHOS') {
      result = await SophosFormData.findOne({ _id: id });
    } else if (prefix === 'CROWDSTRIKE') {
      result = await CrowdstrikeFormData.findOne({ _id: id });
    }else {
      return res.status(400).json({ message: 'Invalid search prefix' });
    }

    if (!result) {
      return res.status(404).json({ message: 'Data not found' });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Error searching data:', error);
    res.status(500).json({ error: 'Error searching data' });
  }
});

app.get("/api/download/:tool", async (req, res) => {
  const tool = req.params.tool;
  let formData;
  try {
    if(tool==="Qradar"){
      formData = await FormData.find();
    }else if(tool==="Sophos"){
       formData = await SophosFormData.find();
    }else if(tool==="Crowdstrike"){
      formData = await CrowdstrikeFormData.find();
    }
    if (!formData) {
      return res.status(404).json({ message: "Form data not found" });
    }

    res.status(200).json(formData);
  } catch (error) {
    console.error("Error searching form data:", error);
    res.status(500).json({ error: "Error searching form data" });
  }
});
app.get("/api/userDetails/:user", async (req, res) => {
  var user = req.params.user;
  let formData;
  try {
      formData = await UserFormData.find();
    
    if (!formData) {
      return res.status(404).json({ message: "Form data not found" });
    }

    res.status(200).json(formData);
  } catch (error) {
    console.error("Error searching form data:", error);
    res.status(500).json({ error: "Error searching form data" });
  }
});

app.get("/api/sophosFormDetails/:user", async (req, res) => {
  var user = req.params.user;
  let formData;
  try {
      formData = await SophosFormData.find({engineer:user});
    
    if (!formData) {
      return res.status(404).json({ message: "Form data not found" });
    }

    res.status(200).json(formData);
  } catch (error) {
    console.error("Error searching form data:", error);
    res.status(500).json({ error: "Error searching form data" });
  }
});

app.post('/api/change-password/:user', async (req, res) => {
  const { old ,oldPassword, newPassword } = req.body;
  const username = req.params.user;
  console.log(oldPassword,newPassword);
  try {
    const user = await UserFormData.findOne({ regname: username });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    if (!bcrypt.compareSync(oldPassword, user.regpassword)) {
      return res.status(401).json({ error: 'Invalid old password' });
    }
    const newPasswordHash = bcrypt.hashSync(newPassword, 10);
    user.regpassword = newPasswordHash;
    await user.save();
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get("/api/formDetails/:user", async (req, res) => {
  var user = req.params.user;
  let formData;
  try {
      formData = await FormData.find({engineer:user});
    
    if (!formData) {
      return res.status(404).json({ message: "Form data not found" });
    }

    res.status(200).json(formData);
  } catch (error) {
    console.error("Error searching form data:", error);
    res.status(500).json({ error: "Error searching form data" });
  }
});
app.post("/api/login", async (req, res) => {
  const { regemail, regpassword } = req.body;

  try {
    
    const user = await UserFormData.findOne({ regemail: regemail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    const passwordMatch = await bcrypt.compare(regpassword, user.regpassword);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    
    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/user/:username", async (req, res) => {
  const email = req.params.username;

  try {
    const useremail = await UserFormData.findOne({ regemail: email });

    if (!useremail) {
      return res.status(404).json({ message: "User not found" });
    }
    const userData = {
      username: useremail.regname,
      email: useremail.regemail,
      role: useremail.role
    };

    res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Error fetching user data" });
  }
});

app.post("/api/saveFormData", async (req, res) => {
  try {
    const formData = new FormData(req.body);
    await formData.save();
    res.status(201).json({ message: "Form data saved successfully"   });
  } catch (error) {
    res.status(500).json({ error: "Error saving form data" });
  }
});
app.post("/api/saveSophosFormData", async (req, res) => {
  try {
    const sophosFormData = new SophosFormData(req.body);
    await sophosFormData.save();
    res.status(201).json({ message: "Form data saved successfully"   });
  } catch (error) {
    res.status(500).json({ error: "Error saving form data" });
  }
});
app.post("/api/saveCrowdstrikeFormData", async (req, res) => {
  try {
    const crowdstrikeFormData = new CrowdstrikeFormData(req.body);
    await crowdstrikeFormData.save();
    res.status(201).json({ message: "Form data saved successfully"   });
  } catch (error) {
    res.status(500).json({ error: "Error saving form data" });
  }
});

// Assuming you have the necessary MongoDB models imported

app.get('/api/open-tickets/:username', async (req, res) => {
  const username = req.params.username;
  try {
    const formDataOpenTickets = await FormData.find({ engineer:username,status: 'Open' });

    const sophosFormDataOpenTickets = await SophosFormData.find({ engineer:username,status: 'Open' });

    const crowdstrikeFormDataOpenTickets = await CrowdstrikeFormData.find({ engineer:username,status: 'Open' });

    const openQradarTickets = [
      ...formDataOpenTickets.map((ticket) => ({ _id: ticket._id, status: ticket.status , engineer: ticket.engineer, comments:ticket.comments })),
    ];
    const openSophosTickets = [
      ...sophosFormDataOpenTickets.map((ticket) => ({ _id: ticket._id, status: ticket.status , engineer: ticket.engineer , comments:ticket.comments})),
    ];
    const openCrowdstrikeTickets = [

      ...crowdstrikeFormDataOpenTickets.map((ticket) => ({ _id: ticket._id, status: ticket.status, engineer: ticket.engineer , comments:ticket.comments })),
    ];

    res.status(200).json({ openQradarTickets , openSophosTickets, openCrowdstrikeTickets});
  } catch (error) {
    console.error('Error fetching open tickets:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});