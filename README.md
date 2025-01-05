# README for Frontend (GreedyCoin)

## GreedyCoin - Frontend Application
The `GreedyCoin` is a React-based frontend application that interacts with the backend API to calculate and display the minimum number of coins needed for a given target amount.

---

## Technologies Used
1. **React.js**: Frontend framework for building UI.
2. **Axios**: For making HTTP requests.
3. **Docker**: Containerization for deployment.
4. **Nginx**: Web server to serve the React app.

---

## VM Setup and Prerequisites

### 1. Clone the Frontend Repository
```bash
git clone https://github.com/christian-quah/greedy-coin.git
cd greedy-coin
```

### 2. Update Environment Configuration
Edit the `.env` file to set the backend URL:
```plaintext
REACT_APP_BACKEND_URL=http://<your-backend-url>:8080
```

### 3. Build and Run the Docker Image
```bash
docker build -t greedy-coin-frontend .
docker run -d -p 3000:80 --name greedy-frontend greedy-coin-frontend
```

---

## Combined Testing Instructions

### Backend
- Test using:
  ```bash
  curl -X POST -H "Content-Type: application/json" \
       -d '{"targetAmount":7.03,"coinDenominations":[0.01,0.5,1.0,5.0,10.0]}' \
       http://<VM_PUBLIC_IP>:8080/api/coins/calculate
  ```

### Frontend
- Open your browser and navigate to:
  ```plaintext
  http://<VM_PUBLIC_IP>
  ```

---

## Notes

- **Ingress Rules**: Ensure the Cloud instance allows traffic on the required ports (`8080` for the backend, `3000` for the frontend).
- **Docker Cleanup**: Use `docker ps` and `docker rm` to manage containers as needed.
- **Scaling**: For production, consider using a load balancer and securing endpoints with HTTPS.

