# 📋 Student Feedback Portal (STFBP) - Workflow Guide

## 🎯 Project Overview
**STFBP** is a full-stack Student Feedback Portal built with:
- **Frontend**: HTML, CSS, JavaScript (modern white & green UI)
- **Backend**: Node.js + Express.js
- **Database**: MySQL
- **Branding**: DevByHasnat

---

## 📁 Project Structure

```
Student Feedback Project/
├── index.html                 # Main frontend (STFBP portal)
├── style.css                  # Styling (white & green theme)
├── script.js                  # Frontend logic & API calls
├── Backend/
│   ├── server.js             # Express.js backend server
│   ├── package.json          # Node dependencies
│   └── node_modules/         # Dependencies
├── WORKFLOW.md               # This file
└── README.md                 # (Optional) General documentation
```

---

## 🚀 Quick Start

### **Step 1: Prerequisites**
Ensure you have installed:
- **Node.js** (v14+): [nodejs.org](https://nodejs.org)
- **MySQL** (v5.7+): [mysql.com](https://mysql.com)
- **Git** (for version control)

Verify installations:
```bash
node --version
npm --version
mysql --version
```

---

### **Step 2: Database Setup**

#### Create MySQL Database
Open MySQL CLI and run:
```sql
-- Create database
CREATE DATABASE stfbp;

-- Select the database
USE stfbp;

-- Create feedback table
CREATE TABLE feedback (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_name VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Verify table creation
DESCRIBE feedback;
```

---

### **Step 3: Backend Setup**

Navigate to the Backend folder:
```bash
cd "/home/cinematic-production/Desktop/Student Feedback Project/Backend"
```

Install dependencies:
```bash
npm install
```

**Install required packages** (if not already installed):
```bash
npm install express mysql2 cors body-parser
```

---

### **Step 4: Start the Backend Server**

Run the server:
```bash
node server.js
```

**Expected output:**
```
Server running on http://localhost:3000
Connected to MySQL database.
```

✅ Backend is now live at `http://localhost:3000`

---

### **Step 5: Start the Frontend**

Open a new terminal and navigate to the project root:
```bash
cd "/home/cinematic-production/Desktop/Student Feedback Project"
```

Serve the frontend locally:
```bash
python3 -m http.server 8000
```

**Expected output:**
```
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
```

✅ Frontend is now live at `http://localhost:8000`

---

## 📝 Development Workflow

### **1. Making Changes to Frontend**

Edit `index.html`, `style.css`, or `script.js` as needed.

**Test in browser:**
- Open `http://localhost:8000`
- Refresh page (Ctrl+R or Cmd+R) to see changes
- Check browser console (F12) for errors

---

### **2. Making Changes to Backend**

Edit `Backend/server.js` with API logic changes.

**Restart backend:**
1. Stop current server (Ctrl+C)
2. Run: `node server.js`
3. Test with curl or browser

**Test a POST request:**
```bash
curl -X POST http://localhost:3000/add-feedback \
  -H "Content-Type: application/json" \
  -d '{"student_name":"John Doe","message":"Great feedback!"}'
```

**Test a GET request:**
```bash
curl http://localhost:3000/feedback
```

---

### **3. Database Management**

View feedback entries in MySQL:
```bash
# Login to MySQL
mysql -u root -p

# Use the database
USE stfbp;

# View all feedback
SELECT * FROM feedback;

# View feedback with timestamp
SELECT student_name, message, created_at FROM feedback ORDER BY created_at DESC;

# Delete old feedback (if needed)
DELETE FROM feedback WHERE id = <id>;

# Clear all feedback
TRUNCATE TABLE feedback;
```

---

## 🔄 Complete Workflow (Daily Development)

### **Morning - Start Work**
```bash
# Terminal 1: Start Backend
cd "/home/cinematic-production/Desktop/Student Feedback Project/Backend"
node server.js

# Terminal 2: Start Frontend
cd "/home/cinematic-production/Desktop/Student Feedback Project"
python3 -m http.server 8000

# Browser: Open http://localhost:8000
```

### **During Development**
- Edit frontend files → Refresh browser (Ctrl+R)
- Edit backend files → Stop & restart backend (Ctrl+C, then `node server.js`)
- Test API endpoints with curl or Postman
- Monitor MySQL database with `mysql` CLI

### **Before Committing**
```bash
# Test all functionality in browser
# Verify API endpoints are working
# Check database entries
# Clean up console.log() statements (optional)
```

### **Version Control**
```bash
git status                    # Check modified files
git add .                     # Stage changes
git commit -m "description"   # Commit with message
git push origin main          # Push to remote
```

---

## 🧪 Testing Checklist

- [ ] Backend server starts without errors
- [ ] Frontend loads at `http://localhost:8000`
- [ ] Can submit feedback via form
- [ ] Submitted feedback appears in the list
- [ ] GET `/feedback` returns JSON data
- [ ] POST `/add-feedback` accepts new feedback
- [ ] Database records are saved correctly
- [ ] UI renders correctly (white & green theme)
- [ ] No console errors in browser (F12)

---

## 🛠️ Troubleshooting

### **Backend won't start**
```bash
# Check if port 3000 is already in use
lsof -i :3000

# Kill process on port 3000
kill -9 <PID>

# Try again
node server.js
```

### **Database connection fails**
```bash
# Check MySQL is running
mysql -u root -p

# Verify database exists
SHOW DATABASES;
USE stfbp;
DESCRIBE feedback;

# Restart MySQL if needed
sudo systemctl restart mysql
```

### **Frontend API calls fail**
- Check backend is running on port 3000
- Open browser console (F12) for errors
- Verify `API_URL` in `script.js` is `http://localhost:3000`
- Check CORS is enabled in `server.js`

### **Port conflicts**
```bash
# Find what's using port 3000
lsof -i :3000

# Use different port in server.js and update script.js
# Or kill the process using it
```

---

## 📦 Deployment (Production)

### **Option 1: Linux/VPS Server**
1. Upload project to server (via FTP/SSH)
2. Install Node.js & MySQL on server
3. Set up database with same SQL commands
4. Run backend with process manager (PM2):
   ```bash
   npm install -g pm2
   pm2 start "node server.js" --name "stfbp-backend"
   pm2 save
   pm2 startup
   ```
5. Serve frontend with Nginx or Apache

### **Option 2: Docker**
Create `Dockerfile` for containerized deployment (optional)

### **Option 3: Cloud Platforms**
- Heroku (backend)
- Vercel/Netlify (frontend)
- AWS/Azure/DigitalOcean (full stack)

---

## 🔐 Security Notes

⚠️ **Before Production:**
- Change MySQL password (currently `MyRootP@ssword123`)
- Use environment variables for sensitive data
- Add input validation & sanitization
- Enable HTTPS
- Add authentication if needed
- Validate all API requests

---

## 📚 API Reference

### **GET /feedback**
Fetch all student feedback

**Request:**
```bash
curl http://localhost:3000/feedback
```

**Response:**
```json
[
  {
    "student_name": "John Doe",
    "message": "Great portal!"
  }
]
```

---

### **POST /add-feedback**
Submit new feedback

**Request:**
```bash
curl -X POST http://localhost:3000/add-feedback \
  -H "Content-Type: application/json" \
  -d '{"student_name":"Jane Doe","message":"Amazing!"}'
```

**Response:**
```json
{
  "message": "Feedback submitted successfully!"
}
```

---

## 📞 Support & Maintenance

- **Developer**: DevByHasnat
- **Project**: Student Feedback Portal (STFBP)
- **Created**: January 2026

For issues or improvements, update this workflow and commit to version control.

---

## ✨ Key Features

✅ Clean white & green UI theme  
✅ Real-time feedback submission  
✅ MySQL database persistence  
✅ RESTful API backend  
✅ Responsive design  
✅ Zero-dependency frontend  
✅ Easy deployment  

---

**Happy Coding! 🚀**
