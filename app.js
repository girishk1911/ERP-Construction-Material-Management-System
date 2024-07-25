// require('dotenv').config();
// const path = require('path');

// const express = require('express');
// //const expressLayouts = require('express-ejs-layouts');
// const methodOverride = require('method-override');
// const flash = require('connect-flash');
// const session = require('express-session');
// const PDFDocument = require('pdfkit');




// const express = require('express');
// const expressLayout = require('express-ejs-layouts');
// //app.set('views', path.join(__dirname, 'views'));
// const methodOverride = require('method-override');

// // npm uninstall express-flash-message
// //const { flash } = require('express-flash-message');

// // npm install connect-flash
// const flash = require('connect-flash');

// const session = require('express-session');
// const connectDB = require('./server/config/db');

// const Customer = require("./server/models/employee");
// const Sites_info = require("./server/models/sites");
// const Material = require("./server/models/material");
// const users = require("./server/models/login");

// const app = express();
// const port = process.env.PORT || 5000;

// // Connect to Database  
// connectDB();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(methodOverride('_method'));

// // Static Files
// app.use(express.static('public'));
// app.use(express.static('./employee'))
// //app.set('views', path.join(__dirname, 'employee/views/layouts'));


// // Express Session
// app.use(
//   session({
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
//     }
//   })
// );

// // Flash Messages
// app.use(flash({ sessionKeyName: 'flashMessage' }));

// // Templating Engine
// app.use(expressLayout);
// app.set('layout', './layouts/main');
// app.set('view engine', 'ejs');

// app.get('/dashboard', (req, res) => {
//   res.render('dashboard', { layout: './layouts/dashboard' });
// });

// // Or, when rendering a view
// app.get('/profile', (req, res) => {
//   res.render('profile', { layout: './layouts/profile' });
// });

// // Routes
// app.use("/", require("./server/routes/login_routes"));
// app.use('/', require('./server/routes/site_routes'))
// app.use('/', require("./server/routes/employee_routes"));
// app.use('/', require("./server/routes/material_routes"));

// // Handle 404
// app.get('*', (req, res) => {
//   console.error('404 - Not Found:', req.originalUrl);
//   res.status(404).render('404');
// });

// app.listen(port, ()=> {
//   console.log(`App listeing on port ${port}`)
// });


// const express = require('express');
// const mongoose = require('mongoose');
// const PDFDocument = require('pdfkit');

// const Material = require('./models/material'); // Assuming you have a Material model

// //const app = express();

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/your-database', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Failed to connect to MongoDB', err));

// // Route to generate and download PDF
// app.get('/download-pdf', async (req, res) => {
//   try {
//     // Retrieve data from MongoDB
//     const materials = await Material.find();

//     // Create a new PDF document
//     const doc = new PDFDocument();
//     doc.pipe(res);

//     // Add data to the PDF
//     materials.forEach(material => {
//       doc.text(`Material: ${material.Material}`);
//       doc.text(`Site Number: ${material.SiteNumber1}`);
//       // Add other fields as needed
//       doc.moveDown();
//     });

//     // Finalize the PDF and send it to the client
//     doc.end();
//   } catch (error) {
//     console.error('Error generating PDF:', error);
//     res.status(500).send('Error generating PDF');
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
// const PDFDocument = require('pdfkit');
const pug = require('pug');
const ejs = require('ejs');

const connectDB = require('./server/config/db');
const Material = require('./server/models/material');

const app = express();
const port = process.env.PORT || 5000;

// Connect to Database  
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Express Session
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 } // 1 week
}));


// Flash Messages
app.use(flash({ sessionKeyName: 'flashMessage' }));

// Templating Engine
app.use(expressLayouts);
app.set('view engine', 'ejs');


// Set the default layout to 'dashboard'
app.set('layout', './layouts/dashboard');

// Check if the user is logged in
app.use((req, res, next) => {
  // Check if the user is logged in and set the layout accordingly
  console.log(req.session.logged);
  if (req.session.logged===1) {
    app.set('layout', './layouts/profile');
    console.log(req.session.logged);
    console.log("the profile");
  }else if(req.session.logged===2){
    app.set('layout', './layouts/main');
    console.log(req.session.logged);
    console.log("the profile 2");
  }
  
  
  else {
    app.set('layout', './layouts/dashboard');
    console.log("The dashboard .....");
  }
  next();
});



// Route for rendering the profile page with its specific layout
// app.get('/profile', (req, res) => {
//   // Set the layout for this specific route to 'profile'
//   res.render('profile', { layout: './layouts/profile' });
// });






// Routes
app.use('/', require("./server/routes/material_routes_emp"));
app.use("/", require("./server/routes/login_routes"));
app.use('/', require('./server/routes/site_routes'));
app.use('/', require("./server/routes/employee_routes"));
app.use('/', require("./server/routes/material_routes"));
//app.use('/', require("./server/routes/material_routes_emp"));

// PDF Generation Route
// app.get('/download-pdf', async (req, res) => {
//   try {
//     // Retrieve data from MongoDB
//     const materials = await Material.find();

//     if (materials.length === 0) {
//       return res.status(404).send('No materials found');
//     }

//     // Create a new PDF document
//     const doc = new PDFDocument();
//     res.setHeader('Content-Disposition', 'attachment; filename="materials.pdf"');
//     doc.pipe(res);

//     // Add data to the PDF
//     materials.forEach(material => {
//       doc.text(`Material: ${material.Material}`);
//       doc.text(`Site Number: ${material.SiteNumber1}`);
//       // Add other fields as needed
//       doc.moveDown();
//     });

//     // Finalize the PDF
//     doc.end();
//   } catch (error) {
//     console.error('Error generating PDF:', error);
//     res.status(500).send('Error generating PDF');
//   }
// });

// Handle 404
app.use((req, res) => {
  console.error('404 - Not Found:', req.originalUrl);
  res.status(404).render('404');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
