const Purchase = require("../Models/Purchase");
const moment = require("moment");

const getAllDate = (startDay, start, end) => {
  let pos = start;
  let result = [startDay.format("DD/MM/YYYY")];
  while (pos < end) {
    result = [...result, startDay.add(1, "days").format("DD/MM/YYYY")];
    pos++;
  }
  return result;
};
const getRevenueByDate = (dates, orders) => {
  return dates?.map((date) => {
    return (
      orders?.reduce((result, item) => {
        const index = item.status?.findIndex((sta) => sta.name === "2");
        if (index > -1) {
          const dayItem = moment(item.status[index].time).format("DD/MM/YYYY");
          if (date === dayItem && item.status[index].name === "2") {
            return result + item.totalPrice;
          }
        }
      }, 0) || 0
    );
  });
};
const populateArr = [
  {
    path: "products.product",
    populate: [
      {
        path: "images",
      },
      {
        path: "sizes",
        populate: "size",
      },
    ],
  },
  {
    path: "address",
  },
];
class PurchaseController {
  async getAll(req, res) {
    const orders = await Purchase.find().populate(populateArr);
    return res.status(200).json({
      success: true,
      orders,
    });
  }
  async getOrderById(req, res) {
    const { id } = req.params;
    const order = await Purchase.findById(id).populate(populateArr);
    return res.status(200).json({
      success: true,
      order,
    });
  }
  async getRevenueDay(req, res) {
    //giao hàng thành công mới cộng vào doanh thu
    const orders = await Purchase.find();
    const dayNow = moment().format("DD/MM/YYYY");
    const revenue = orders?.reduce((result, item) => {
      const index = item.status?.findIndex((sta) => sta.name === "2");
      if (index > -1) {
        const dayItem = moment(item.status[index].time).format("DD/MM/YYYY");
        if (dayNow === dayItem && item.status[index].name === "2") {
          // && item.status.name === '2'
          return result + item.totalPrice;
        }
      }
    }, 0);
    return res.status(200).json({
      success: true,
      label: 'Doanh thu hôm nay',
      labels: [moment().format("DD")],
      data: [revenue] || [],
    });
  }
  async getRevenueMonth(req, res) {
    //giao hàng thành công mới cộng vào doanh thu
    const dateTz = moment().tz("Asia/Ho_Chi_Minh");
    const orders = await Purchase.find();
    const startWeek = dateTz.startOf("isoWeek");

    const dates = await getAllDate(startWeek, 1, 7);
    const revenue = await getRevenueByDate(dates, orders);

    return res.status(200).json({
      success: true,
      label: 'Doanh thu tuần này',
      labels: dates,
      data: revenue || [],
    });
  }
}

module.exports = new PurchaseController();
