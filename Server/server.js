// import express from "express";
// import cors from "cors";

// import { connectToDB, config } from "./db.js";

// const app = express();
// app.use(cors());
// app.use(express.json());
// const PORT = process.env.PORT || 5000;

// app.post("/api/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const pool = await connectToDB();
//     const result = await pool
//       .request()
//       .query(`SELECT * FROM Users WHERE email='${email}'`);
//     if (result.recordset.length === 0) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const user = result.recordset[0];

//     if (user.password === password) {
//       res.status(200).json({ message: "Login successful", user });
//     } else {
//       res.status(401).json({ message: "Invalid email or password" });
//     }
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// });

// connectToDB();

// app.post("/api/signup", async (req, res) => {
//   try {
//     const { email, password, name } = req.body;
//     console.log("Request body:", req.body);

//     if (!email || !password || !name) {
//       return res.status(400).json({ message: "Email or password missing" });
//     }

//     const pool = await connectToDB();

//     const checkUser = await pool
//       .request()
//       .input("email", email)
//       .query("SELECT * FROM Users WHERE email = @email");

//     if (checkUser.recordset.length > 0) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     await pool
//       .request()
//       .input("email", email)
//       .input("password", password)
//       .input("name", name)
//       .query("INSERT INTO Users (email, password, name) VALUES (@email, @password, @name)");

//     res.status(201).json({ message: "Sign Up Successful" });
//   } catch (err) {
//     console.error("Error during sign-up:", err);
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// });


// app.post("/api/cart", async (req, res) => {
//   const { userEmail, id, title, price, quantity, action="incrment"} = req.body;

//   if (!userEmail || !id || !title) {
//     return res.status(400).json({ message: "Missing data" });
//   }

//   try {
//     const pool = await connectToDB();

//     const checkCart = await pool
//       .request()
//       .input("userEmail", userEmail)
//       .input("id", id).query(`
//         SELECT * FROM Cart WHERE UserEmail = @userEmail AND id = @id
//       `);

//     if (checkCart.recordset.length > 0) {
//       if (action === "set") {

//         await pool
//         .request()
//         .input("userEmail", userEmail)
//         .input("id", id)
//         .input("title", title)
//         .input("quantity", parseInt(quantity)).query(`
//           UPDATE Cart
//           SET Quantity =  @quantity
//           WHERE UserEmail = @userEmail AND id = @id
//         `);
//       } else {
//       await pool
//         .request()
//         .input("userEmail", userEmail)
//         .input("id", id)
//         .input("title", title)
//         .input("quantity", parseInt(quantity)).query(`
//           UPDATE Cart
//           SET Quantity = Quantity + @quantity
//           WHERE UserEmail = @userEmail AND id = @id
//         `);
//       }

//       res.status(200).json({ message: "Cart quantity updated" });
//     } else {
//       await pool
//         .request()
//         .input("userEmail", userEmail)
//         .input("id", id)
//         .input("title", title)
//         .input("price", price)
//         .input("quantity", quantity).query(`
//         INSERT INTO Cart (UserEmail, id, Title, Price, Quantity)
//         VALUES (@userEmail, @id, @title, @price, @quantity)
//       `);

//       res.status(200).json({ message: "Cart saved successfully" });
//     }
//   } catch (error) {
//     console.error("Cart save error:", error);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// });

// app.put("/api/cart", async (req, res) => {
//   const { userEmail, id, title, quantity } = req.body;

//   if (!userEmail || !id || !title || !quantity ) {
//     return res.status(400).json({ message: "Missing data" });
//   }

//   try {
//     const pool = await connectToDB();

//     await pool
//       .request()
//       .input("userEmail", userEmail)
//       .input("id", id)
//       .input("title", title)
//       .input("quantity", quantity)
//       .query(`
//         UPDATE Cart
//         SET Quantity = @quantity
//         WHERE UserEmail = @userEmail AND id = @id
//       `);

//     res.status(200).json({ message: "Quantity updated" });
//   } catch (error) {
//     console.error("Quantity update error:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// app.delete("/api/cart", async (req, res) => {
//   const { userEmail, id } = req.body;

//   if (!userEmail || !id) {
//     return res.status(400).json({ message: "Missing data" });
//   }

//   try {
//     const pool = await connectToDB();

//     await pool
//       .request()
//       .input("userEmail", userEmail)
//       .input("id", id)
//       .query(`
//         DELETE FROM Cart
//         WHERE UserEmail = @userEmail AND id = @id
//       `);

//     res.status(200).json({ message: "Item deleted from cart" });
//   } catch (error) {
//     console.error("Delete item error:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// app.delete('/api/cart/clear', async (req, res) => {

//   const {userEmail} = req.body;

//   if (!userEmail) {

//     return res.status(400).json({message: "user email is required"});
//   }

//   try {

//     const pool = await connectToDB();

//     await pool 
//     .request()
//     .input("userEmail", userEmail)
//     .query("DELETE  FROM Cart WHERE UserEmail = @userEmail");

//     await pool 
//     .request()
//     .input("email", userEmail)
//     .query("Delete  FROM Users WHERE Email = @email")

//     res.status(200).json({message: "cart and user deleted successfully"});
//   } catch(error) {

//     console.error("clear cart & user delete error:", error);
//     res.status(500).json({message: "server error", error: error.message});
//   }

// });



// // dummy api login 

// app.get("/api/login", (req, res) => {
//   res.status(200).json({ message: "GET request not allowed, use POST." });
// });
// app.get("/api/signup", (req, res) => {
//   res.status(200).json({ message: "GET request not allowed, use POST." });
// });

// app.get("/api/cart", async (req, res) => {
//   try {
//     const pool = await connectToDB();
//     const result = await pool.request().query("SELECT * FROM Cart");
//     res.status(200).json(result.recordset);
//   } catch (error) {
//     console.error("Error fetching cart:", error);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// });


// app.listen(PORT, () => {
//   console.log(`Server is running on port http://localhost:${PORT}`);
// });


import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:5173',
  'https://gleaming-cocada-5dd813.netlify.app/',
  'https://react-redux-ecommerce-7.onrender.com'
];

app.use(express.json());
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Dummy Login API
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Dummy check
    if (email && password) {
      res.status(200).json({ message: "Login successful", user: { email } });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Dummy Signup API
app.post("/api/signup", async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      return res.status(400).json({ message: "Email or password missing" });
    }
    res.status(201).json({ message: "Sign Up Successful", user: { email, name } });
  } catch (err) {
    console.error("Error during sign-up:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// Dummy Cart APIs
app.post("/api/cart", async (req, res) => {
  const { userEmail, id, title, price, quantity } = req.body;
  if (!userEmail || !id || !title) {
    return res.status(400).json({ message: "Missing data" });
  }
  res.status(200).json({ message: "Cart item added or updated successfully" });
});

app.put("/api/cart", async (req, res) => {
  const { userEmail, id, title, quantity } = req.body;
  if (!userEmail || !id || !title || !quantity) {
    return res.status(400).json({ message: "Missing data" });
  }
  res.status(200).json({ message: "Cart item quantity updated successfully" });
});

app.delete("/api/cart", async (req, res) => {
  const { userEmail, id } = req.body;
  if (!userEmail || !id) {
    return res.status(400).json({ message: "Missing data" });
  }
  res.status(200).json({ message: "Cart item deleted successfully" });
});

app.delete('/api/cart/clear', async (req, res) => {
  const { userEmail } = req.body;
  if (!userEmail) {
    return res.status(400).json({ message: "User email is required" });
  }
  res.status(200).json({ message: "Cart and user cleared successfully" });
});

// Dummy GET APIs for login/signup/cart
app.get("/api/login", (req, res) => {
  res.status(200).json({ message: "GET request not allowed, use POST." });
});

app.get("/api/signup", (req, res) => {
  res.status(200).json({ message: "GET request not allowed, use POST." });
});

app.get("/api/cart", async (req, res) => {
  res.status(200).json({ message: "Dummy cart data fetch successful", cart: [] });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
