const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);

main()
  .then(() => {
    console.log("connection sucessful");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

app.get("/", (req, res) => {
  res.send("we are here for you");
});

//all listings
app.get("/listings", async (req, res) => {
  let lists = await Listing.find({});
  res.render("listings/allListings.ejs", { lists });
});

//new Listing rout
app.get("/listings/new", (req, res) => {
  res.render("listings/newListing.ejs");
});

app.post("/listings", async (req, res) => {
  const listing = new Listing(req.body);
  await listing.save();
  res.redirect("/listings");
});

//One Listing rout
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("listings/oneListing.ejs", { listing });
});

//edit listing rout
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("listings/editListing.ejs", { listing });
});

app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  console.log(req.body);
  console.log(id);
  await Listing.findByIdAndUpdate(id, req.body);
  res.redirect(`/listings/${id}`);
});

//delete listing rout
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});

// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "my new villa",
//     description: "its also new the beach",
//     price: 12000,
//     location: "fathegarh, farrukhabad",
//     country: "India",
//   });
//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("sucess to save");
// });

app.listen(8080, () => {
  console.log("server working well...............");
});
