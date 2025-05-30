// ייבוא express
const express = require('express');
const router = express.Router();

// ✅ ייבוא כל הפונקציות כולל addCarToCustomer ו־getNewCustomersThisMonth
const {
  addCustomer,
  getAllCustomers,
  searchCustomer,
  updateCustomer,
  getNewCustomersThisMonth,
  addCarToCustomer
} = require('../controllers/customer.controller');

/**
 * 📌 POST /api/customers
 * הוספת לקוח חדש למערכת
 */
router.post('/', addCustomer);

/**
 * 📌 GET /api/customers
 * שליפת כל הלקוחות הקיימים
 */
router.get('/', getAllCustomers);

/**
 * 📌 GET /api/customers/search?query=משה
 * חיפוש לקוחות לפי ת"ז או שם
 */
router.get('/search', searchCustomer);

/**
 * 📌 PUT /api/customers/:id
 * עדכון פרטי לקוח לפי מזהה
 */
router.put('/:id', updateCustomer);

/**
 * 📌 PUT /api/customers/:id/add-car
 * הוספת רכב ללקוח קיים
 */
router.put("/:id/add-car", addCarToCustomer);

/**
 * 📌 GET /api/customers/new-this-month
 * שליפת לקוחות שהצטרפו החודש
 */
router.get("/new-this-month", getNewCustomersThisMonth);

// ייצוא ה-router לשימוש בקובץ server.js
module.exports = router;
