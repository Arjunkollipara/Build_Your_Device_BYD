# **CAMPUS COLLAB – Collaborative Project Showcase & Team Builder**

## **Overview**

**ProjectHub** is a collaborative platform designed for colleges, schools, and organizations, enabling students to showcase their projects, find team members, and build a portfolio of their skills and contributions. It bridges the gap between talent discovery, project collaboration, and resource availability within academic ecosystems.

## **Key Features**

* **User Profiles & Portfolios** – Each user can showcase their skills, past projects, and achievements.
* **Project Repository** – Students can submit and display their projects securely.
* **Smart Team Formation** – Projects requiring team members can post requirements, and the system suggests ideal candidates based on skills and institution data.
* **Resource Locator** – Teams can find tools, labs, or materials from institutions or peers on a credit or rental basis.
* **Gamified Progress** – Users earn badges for contributions, creating a dynamic, evolving portfolio of real work.

---

## **Tech Stack**

* **Frontend:** React.js (or Next.js)
* **Backend:** Node.js + Express.js
* **Database:** MongoDB
* **API Layer:** REST API for frontend-backend communication
* **Authentication:** JWT-based (to be implemented in upcoming versions)

---

## **Why is it Unique?**

Unlike traditional project listing platforms, ProjectHub focuses on **institution-level collaboration** with features like smart team suggestions, resource sharing, and real-time portfolio updates. It’s not just a repository; it’s a **growth and networking ecosystem** for students and innovators.

---

## **Installation & Setup**

### **1. Clone the Repository**

```bash
git clone https://github.com/your-username/projecthub.git
cd projecthub
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Configure Environment Variables**

Create a `.env` file in the project root and set:

```
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
PORT=5000
```

### **4. Run the Application**

```bash
# Start backend
cd backend
npm run dev

# Start frontend
cd frontend
npm start
```

---

## **Roadmap**

* [x] User creation & project listing (basic prototype)
* [X] Authentication & authorization (JWT, OAuth)
* [X] Profile building with skills, links, and portfolio display
* [ ] Project creation with join requests & approval system
* [ ] Recommendation engine for skill-based team formation
* [ ] Resource locator with credit/rental system
* [ ] Gamified achievement system with badges & levels

---

## **Contributing**

Pull requests are welcome! Please ensure your changes follow the coding guidelines and are well-documented.

---

## **License**
© 2025 Arjun Kollipara. All rights reserved.