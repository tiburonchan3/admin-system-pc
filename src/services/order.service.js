import { API_HOST } from "../utils/constant";
import { TokenService } from "./token.service";

export class OrderService extends TokenService {
  async getOrders(page = 1, search = "") {
    const response = await fetch(
      `${API_HOST}/orden/order-paginated?pagina=${page}&searchOrden=${search}`,
      {
        headers: { token: `Bearer:${this.getToken()}` },
      }
    );
    return response.json();
  }
  async filterDates() {
    const response = await fetch(`${API_HOST}/orden/orders`, {
      headers: { token: `Bearer:${this.getToken()}` },
    });
    return response.json();
  }
  async changeStatus(id) {
    const response = await fetch(`${API_HOST}/orden/order-status/${id}`, {
      method: "POST",
      headers: { token: `Bearer:${this.getToken()}` },
    });
    return response.json();
  }
  async getOrderDetails(orden) {
    const response = await fetch(`${API_HOST}/orden-detalle/details`, {
      method: "POST",
      headers: { token: `Bearer:${this.getToken()}`,"Content-Type": "application/json", },
      body: JSON.stringify(orden),
    });
    return response.json();
  }
  async saveLocalOrder(items) {
    const response = await fetch(`${API_HOST}/orden/local-order`, {
      method: "POST",
      headers: {
        token: `Bearer:${this.getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(items),
    });
    return response.json();
  }
}
