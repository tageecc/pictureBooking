var Order = require('../model/Order');
var SettingService = require('../service/SettingService');
/**
 * 添加订单
 * @param order {String}
 * @returns {Promise}
 */
exports.addOrder = function (order) {
    return new Promise(function (resolve, reject) {
        Order.create(order, function (err, order) {
            if (err) {
                reject();
            } else {
                resolve();
            }
        })
    });
};

/**
 * 获取订单详情
 * @param {String} oid 订单id
 */
exports.getOrder = function (oid) {
    return new Promise(function (resolve, reject) {
        Order.findOne({_id: oid}, function (err, order) {
            if (err) {
                reject();
            } else {
                resolve(order);
            }
        })
    });
};
/**
 * 删除订单
 * @param oid
 */
exports.delOrder = function (oid) {
    return new Promise(function (resolve, reject) {
        Order.remove({_id: oid}, function (err) {
            if (err) {
                reject();
            } else {
                resolve();
            }
        })
    });
};

/**
 * 根据关键词搜索订单
 * @param {String} key
 */
exports.findOrderByKey = function (key) {
    var _key = new RegExp(key, 'i');
    return new Promise(function (resolve, reject) {
        Order.find({$or: [{nickname: _key}, {department: _key}, {phone: _key}, {email: _key}]}, function (err, orders) {
            if (err) {
                reject(err);
            } else {
                resolve(orders);
            }
        })

    });
};
/**
 * 获取当天不可预约时间段
 * @param date
 */
exports.getTimeByDate = function (date) {
    var _date = new RegExp(date);
    return new Promise(function (resolve, reject) {
        Order.find({datetime: _date}, 'datetime', function (err, datetime) {
            if (err) {
                reject(err);
            } else {
                var times = [], map = {};
                datetime.forEach(function (v, i) {
                    v = v.datetime;
                    if (map[v]) map[v]++;
                    else map[v] = 1;
                });
                SettingService.getSettingDuringNumber().then(function (num) {
                    for (var t in map) {
                        if (map[t] >= num) {

                            times.push(t.split(' ')[1])
                        }
                    }
                    resolve(times);
                });

            }
        })

    });
};
/**
 * 更改订单状态
 * @param oid {String} 订单id
 * @param sid {String} 状态id
 */
exports.updateOrderStatus = function (oid, sid) {
    return new Promise(function (resolve, reject) {
        Order.update({_id: oid}, {"$set": {status: sid}}, function (err, order) {
            if (err) {
                reject();
            } else {
                resolve(order);
            }
        })
    });
};
/**
 * 获取所有订单
 * @param page {Number} 页码
 * @param perPage {Number} 每页显示条数
 */
exports.getAllOrder = function (page, perPage, resolve, reject) {
    if (!page || page < 1) {
        page = 1;
    }
    if (!perPage || perPage < 1) {
        perPage = 15;
    }
    Order.count(function (err, total) {
        Order.find({}, '_id nickname phone datetime status')
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec(function (err, orders) {
                if (err) {
                    if (reject) reject(err);
                } else {
                    if (resolve) resolve(orders, page, perPage, total);
                }
            })
    });
};