const Product = require("../Models/Product");
const Category = require("../Models/Category");
const Account = require("../Models/Account");
const Cart = require("../Models/Cart");
const Color = require("../Models/Color");
const ColorProductGroup = require("../Models/ColorProductGroup");
const Image = require("../Models/Image");
const Love = require("../Models/Love");
const Seen = require("../Models/Seen");
const Size = require("../Models/Size");
const mongoose = require('mongoose');

const {transporter} = require('../../service/Mailler')
const hbs = require('nodemailer-express-handlebars');

async function sendBill() {
	try {
		let options = {
			viewEngine: {
				extname: '.handlebars',
				defaultLayout: '',
				layoutsDir: '',
			},
			viewPath: 'src/views/template/',
		};
		transporter.use('compile', hbs(options));

		const info = await transporter.sendMail({
			from: '"Ananas" <nguyenhieunghia7D6@gmail.com>', // sender address
			to: 'nghiadx2001@gmail.com', // list of receivers
			subject: 'Đặt hàng thành công', // Subject line
			template: 'bill',
			context: {
				name: 'ko có',
				bookingId: 'oke',
				date: 'data.date',
				tickets: 'data.tickets',
				total: 'data.total',
				support_url: 'data.support_url',
			},
		});

		console.log('Message sent: %s', info.messageId);
	} catch (error) {
		console.log(error);
	}
}
class HomeControler {
  async index(req, res) {
    
    await sendBill()

    return res.json({ msg: 'HOME API' });
  }
}

module.exports = new HomeControler();
