const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const env = require('dotenv').config();

app = express();

const mongo_uri  = process.env.MONGODB_URI;

