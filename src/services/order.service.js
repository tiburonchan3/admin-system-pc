import { API_HOST } from "../utils/constant";
import { TokenService } from "./token.service";

export class OrderService extends TokenService {
  async getOrders() {
    const response = await fetch(`${API_HOST}/orden/order-paginated`, {
      headers: { token: `Bearer:${this.getToken()}` },
    });
    return response.json()
  }
  async filterDates(){
    const response = await fetch(`${API_HOST}/orden`);
    return response.json()
  }
}
