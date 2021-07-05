import { API_HOST } from "../utils/constant";
import { TokenService } from "./token.service";

export class EmployeeService extends TokenService {
  async getUser() {
    const response = await fetch(`${API_HOST}/empleado`);
    return response.json();
  }
  async getPaginatedUser(page) {
    const response = await fetch(
      `${API_HOST}/empleado/empleado-paginated?pagina=${page}`, {
         headers: {
        token: `Bearer:${this.getToken()}`,
      },
      } 
    );
    return response.json();
  }
  async addEmploye(data) {
    const response = await fetch(`${API_HOST}/empleado/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: `Bearer:${this.getToken()}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
  async register(data) {
    const newDta = data;
    delete newDta.repeatPassword;
    const response = await fetch(`${API_HOST}/empleado`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDta),
    });
    return response.json();
  }
  async login(data) {
    const response = await fetch(`${API_HOST}/auth/loginEmployee`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
  async getEmpById(id) {
    const response = await fetch(`${API_HOST}/empleado/${id}`, {
      headers: {
        token: `Bearer:${this.getToken()}`,
      },
    });
    return response.json();
  }
  async edit(data, id) {
    const response = await fetch(`${API_HOST}/empleado/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: `Bearer:${this.getToken()}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
  async upload(foto) {
    const formData = new FormData();
    formData.append("foto", foto);
    const response = await fetch(`${API_HOST}/empleado/photo`, {
      method: "POST",
      headers: {
        token: `Bearer:${this.getToken()}`,
      },
      body: formData,
    });
    return response.json();
  }
  showImage(name) {
    return `${API_HOST}/empleado/image?image=${name}`;
  }
  async ifExist(code) {
    const response = await fetch(`${API_HOST}/empleado/check/${code}`);
    return response.json();
  }
  async addPass(id, password) {
    const values = {
      password,
    };
    const response = await fetch(`${API_HOST}/auth/add-password/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    return response.json();
  }
  async forgotPassword(email){
    const data = {email}
    const response = await fetch(`${API_HOST}/auth/forgot-password`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(data)
    })
    return response.json()
  }
  async resetPassword(newPassword, token) {
    const response = await fetch(`${API_HOST}/auth/new-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        reset: token
      },
      body: JSON.stringify(newPassword)
    })
    return response.json()
  }
}
