const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to false if not using HTTPS
      sameSite: "none", // Allow cookies to be passed between sites
      maxAge: 3600000, // Session expiration time (in milliseconds)
    },
  })
);

app.use(express.static("public"));

mongoose
  .connect("mongodb+srv://admin:admin@cluster0.6hwms.mongodb.net/products_2")
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
const upload = multer({ storage: storage });

var productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  product_category: {
    type: String,
    required: true,
  },
  product_price: {
    type: Number,
    required: true,
  },
  product_stock: {
    type: Number,
    required: true,
  },
  product_reviews: [
    {
      product_rating: {
        type: Number,
        required: true,
      },
      product_review: {
        type: String,
        required: true,
      },
    },
  ],
  product_description: {
    type: String,
    required: true,
  },
});
var product = mongoose.default.model("Product", productSchema);

var User = mongoose.default.model("User", {
  email: String,
  password: String,
  shopping_bag: Array,
  address: String,
});

app.get("/api/get", async function (req, res) {
  try {
    const result = await product.find();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

app.get("/api/getOneProduct/:productID", async function (req, res) {
  const productID = req.params.productID;
  try {
    const result = await product.find({ _id: productID });
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});
app.post("/api/AddProductToBag", async function (req, res) {
  // console.log(req.body);
  console.log(req.body);
  const { productID, userId } = req.body;
  const user = await User.findOne({ _id: userId })
    .then((document) => {
      if (document) {
        document.shopping_bag.push([productID, 1]);

        // Save the changes
        return document.save();
      } else {
        throw new Error("Document not found");
      }
    })
    .then((updatedDocument) => {
      console.log("Document updated:", updatedDocument);
    })
    .catch((error) => {
      console.error("Error updating document:", error);
    });
});

app.get("/api/getShoppingBag/:userId", async function (req, res) {
  const userId = req.params.userId;
  const user = await User.findOne({ _id: userId });
  if (user.shopping_bag) {
    res.status(200).send(user.shopping_bag);
  }
});

app.delete("/api/deleteFromBag", async function (req, res) {
  const { userId, productId } = req.body;
  console.log(userId, productId);

  const user = await User.findOne({ _id: userId });
  if (user) {
    const newShoppingBag = user.shopping_bag.filter((product) => {
      return product[0] !== productId;
    });

    try {
      const result = await User.updateOne({ shopping_bag: newShoppingBag });
      res.send(result);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(500).send("server error");
  }
});
// ! Users -----------------------------------------------------

app.post("/api/login", async function (req, res) {
  const { email, password, rola } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.send({ error: "User not found" });
  }
  if ((isPasswordMatch = password == user.password)) {
    user.password = "";
    const objectId = user._id;
    const myId = objectId.toString();
    req.session.session = { id: myId, email: email, rola: rola };
    res.cookie("userId", myId);
    res.cookie("email", email);
    res.cookie("role", rola);
    res.status(200).send("cokolwiek");
  } else {
    console.log("error");
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/register", async (req, res) => {
  const { email, password, address } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      var newUser = {
        password: password,
        shopping_bag: [],
        address: address,
        email: email,
      };
      User.create(newUser);
      res.status(200).send("User created!");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/logout", function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.error("Error destroying session:", err);
    }
    res.clearCookie("connect.sid");
    res.clearCookie("email");
    res.clearCookie("userId");
    res.status(200).send("Logged out successfully!");
  });
});

app.get("/api/getAllUsers", async (req, res) => {
  try {
    const result = await User.find();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

app.delete("/api/deleteUser/:userId", async (req, res) => {
  const user_id = req.params.userId;
  try {
    const result = await User.deleteOne({ _id: user_id });
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

app.post("/api/editUser/:userId", async (req, res) => {
  const user_id = req.params.userId;
  const { email, password, address } = req.body;
  try {
    const result = await User.updateOne(
      { _id: user_id },
      { email, password, address }
    );
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

// !Create Product ======================================

app.post("/api/addProduct", upload.single("product_photos"), (req, res) => {
  var {
    product_name,
    product_quantity,
    product_price,
    product_category,
    product_description,
  } = req.body;
  var newProduct = {
    product_name: product_name,
    product_category: product_category,
    product_price: product_price,
    product_stock: product_quantity,
    product_rewiews: [],
    product_description: product_description,
  };
  product.create(newProduct).then((insertedProduct) => {
    fs.rename(
      `./public/${req.file.filename}`,
      `./public/${insertedProduct._id}_0.jpg`,
      () => {}
    );
  });
});

var port = process.env.PORT || 8000;
app.listen(port, function () {
  console.log("Example app listening on port ".concat(port));
});
