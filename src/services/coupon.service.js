import { API_HOST } from "../utils/constant";
import { TokenService } from "./token.service";

export class CouponService extends TokenService {
  async addCoupon(data) {
    const response = await fetch(`${API_HOST}/cupon/create-cupon`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: `Bearer:${this.getToken()}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
  async getCoupons(page = 1) {
    const response = await fetch(
      `${API_HOST}/cupon/cupon-paginated?pagina=${page}`,
      {
        headers: { token: `Bearer:${this.getToken()}` },
      }
    );
    return response.json();
  }
  async changeStatus(query) {
    const response = await fetch(`${API_HOST}/cupon/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: `Bearer:${this.getToken()}`,
      },
      body: JSON.stringify(query),
    });
    return response.json();
  }
  async deleteCoupon(id) {
    const query = {id}
    const response = await fetch(`${API_HOST}/cupon/destroy-cupon`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: `Bearer:${this.getToken()}`,
      },
      body:JSON.stringify(query)
    });
    return response.json();
  }
  async shareCoupon(body) {
    const data = {email:body.email}
    const response = await fetch(`${API_HOST}/cupon/share-cupon?CODIGO_CUPON=${body.cupon}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: `Bearer:${this.getToken()}`
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
}
