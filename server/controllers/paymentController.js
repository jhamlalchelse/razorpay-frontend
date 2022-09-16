const Razorpay = require("razorpay");
const crypto = require("crypto");
const { Payment } = require("../models/paymentModel");

const instance = new Razorpay({
  key_id: "rzp_test_eMCYSYf4h5ZLoW",
  key_secret: "sB8xHTKhV9x4I8ACjgiOzIyF",
});

const secret = "sB8xHTKhV9x4I8ACjgiOzIyF";
exports.checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    res.status(200).json({
      success: true,
      order,
    });
    console.log("order is:", order);
  } catch (e) {
    console.log("errror");
  }
};

exports.paymentVerification = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    // generated_signature = hmac_sha256(order_id + "|" + razorpay_payment_id, "sB8xHTKhV9x4I8ACjgiOzIyF")
    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    console.log("generated_signature is", generated_signature);
    if (generated_signature == razorpay_signature) {
      await Payment.create({
        razorpay_payment_id, razorpay_order_id, razorpay_signature
      })
      res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`)
    } else {
      res.redirect(`http://localhost:3000/paymentsuccess`)
    }
  } catch (e) {
    console.log("error");
  }
};
