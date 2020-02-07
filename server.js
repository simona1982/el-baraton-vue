/* eslint-disable no-param-reassign */
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();

const PRODUCT_DATA_FILE = path.join(__dirname, "server-product-data.json");
const CATEGORY_DATA_FILE = path.join(__dirname, "server-category-data.json");
const CART_DATA_FILE = path.join(__dirname, "server-cart-data.json");

app.set("port", process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

app.get("/categories", (req, res) => {
  fs.readFile(CATEGORY_DATA_FILE, (err, data) => {
    res.setHeader("Cache-Control", "no-cache");
    res.json(JSON.parse(data));
  });
});

app.get("/products", (req, res) => {
  fs.readFile(PRODUCT_DATA_FILE, (err, data) => {
    res.setHeader("Cache-Control", "no-cache");
    res.json(JSON.parse(data));
  });
});

app.get("/cart", (req, res) => {
  fs.readFile(CART_DATA_FILE, (err, data) => {
    res.setHeader("Cache-Control", "no-cache");
    res.json(JSON.parse(data));
  });
});

app.post("/cart", (req, res) => {
  fs.readFile(CART_DATA_FILE, (err, data) => {
    const cartProducts = JSON.parse(data);
    console.log(cartProducts);
    const newCartProduct = {
      quantity: 1,
      price: req.body.price,
      available: req.body.available,
      sublevel_id: req.body.sublevel_id,
      name: req.body.name,
      id: req.body.id
    };
    let cartProductExists = false;
    cartProducts.products.map(cartProduct => {
      if (cartProduct.id === newCartProduct.id) {
        cartProduct.quantity++;
        cartProductExists = true;
      }
    });

    if (!cartProductExists) {
      //const productsArray = Array.from(cartProducts.products);
      //productsArray.push(newCartProduct);
      //console.log(Array.from(cartProducts.products));
      /*const newProd = Object.create({
        quantity: newCartProduct.quantity,
        price: newCartProduct.price,
        available: newCartProduct.available,
        sublevel_id: newCartProduct.sublevel_id,
        name: newCartProduct.name,
        id: newCartProduct.id
      });*/

      cartProducts.products.push(newCartProduct);
    }

    fs.writeFile(CART_DATA_FILE, JSON.stringify(cartProducts, null, 4), () => {
      res.setHeader("Cache-Control", "no-cache");
      res.json(cartProducts);
    });
  });
});

app.post("/cart/delete", (req, res) => {
  fs.readFile(CART_DATA_FILE, (err, data) => {
    let cartProducts = JSON.parse(data);
    cartProducts.map(cartProduct => {
      if (cartProduct.id === req.body.id && cartProduct.quantity > 1) {
        cartProduct.quantity--;
      } else if (cartProduct.id === req.body.id && cartProduct.quantity === 1) {
        const cartIndexToRemove = cartProducts.findIndex(
          cartProduct => cartProduct.id === req.body.id
        );
        cartProducts.splice(cartIndexToRemove, 1);
      }
    });
    fs.writeFile(CART_DATA_FILE, JSON.stringify(cartProducts, null, 4), () => {
      res.setHeader("Cache-Control", "no-cache");
      res.json(cartProducts);
    });
  });
});

app.post("/cart/delete/all", (req, res) => {
  fs.readFile(CART_DATA_FILE, () => {
    let emptyCart = { products: [] };
    fs.writeFile(CART_DATA_FILE, JSON.stringify(emptyCart, null, 4), () => {
      res.json(emptyCart);
    });
  });
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
