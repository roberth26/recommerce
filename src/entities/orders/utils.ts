import { Order } from './types';
import { ProductID } from '../products/types';
import { UserID } from '../users/types';

export function normalizeOrder(order: Order): Order<ProductID, UserID> {
  return {
    ...order,
    products: order.products.map<ProductID>(product =>
      typeof product === 'string' ? product : product.id
    ),
    user: typeof order.user === 'string' ? order.user : order.user.id,
  };
}
