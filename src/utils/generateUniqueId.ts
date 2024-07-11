import { Order } from '../modules/order/order.model';

const generateUniqueId = async () => {
    const yearCode = new Date().getFullYear();
    let uniqueId = yearCode + '' + Math.round(Math.random() * 1000000);
    let isUnique = false;

    while (!isUnique) {
        uniqueId = yearCode + '' + Math.round(Math.random() * 1000000);
        const order = await Order.findOne({ id: uniqueId });
        if (!order) {
            isUnique = true;
        }
    }

    return uniqueId;
};

export default generateUniqueId;
