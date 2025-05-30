import React, { useState } from 'react';
import axios from 'axios';
import Hero from './Hero';
import Footer from '../components/footer';
import Header from '../components/Header';
import ChatBot from '../components/ChatBot';

function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/inquiries', {
        name,
        email,
        phone,
        message,
      });
      alert('✅ ההודעה נשלחה בהצלחה!');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (error) {
      console.error('❌ שגיאה בשליחת ההודעה:', error.message);
      alert('❌ שגיאה בשליחת ההודעה');
    }
  };

  return (
    <div>
      <Header />
      <Hero />

      {/* אזור השירותים */}
      <section className="services bg-dark py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="text-white me-3">השירותים שלנו</h2>
          </div>
          <div className="row">
            {[  // שירותים קצרים לדוגמה
              { img: "p3.jpeg", title: "שירות כללי", text: "אנו מציעים שירות כללי לרכב הכולל החלפת שמן, פילטר שמן ופילטר אוויר, עם דגש על שמירה על ביצועי הרכב ובטיחותו" },
              { img: "p2.jpeg", title: "בדיקה כללית", text: "בדיקה ממוחשבת לאיתור תקלות במנוע, חשמל ומערכות הרכב, להבטחת תקינות ובטיחות הרכב" },
              { img: "p4.jpeg", title: "צמיגים", text: "התקנה, תיקון והחלפה של צמיגים לכל סוגי הרכבים, תוך דגש על איכות, בטיחות ועמידות לאורך זמן" },
              { img: "p5.jpg", title: "מיזוג אוויר", text: "תחזוקה ותיקון מערכות מיזוג אוויר ברכב, כולל מילוי גז ותיקון דליפות לשמירה על יעילות המיזוג" },
              { img: "p6.jpeg", title: "בדיקה לפני טסט", text: "בדיקה מקיפה לרכב הכוללת בדיקת בלמים, תאורה, צמיגים ומערכות בטיחות, להכנת הרכב למעבר בטוח ומהיר בטסט השנתי" },
              { img: "p7.webp", title: "תיקונים", text: "טיפול ותיקון מערכות הרכב, כולל מנוע, בלמים, מתלים ותיבות הילוכים, על ידי צוות מומחים לשמירה על ביצועי הרכב ואמינותו" },
            ].map((service, index) => (
              <div key={index} className="col-lg-4 col-md-6 mb-4">
                <div className="card h-100 shadow service-card">
                  <img src={`/img/${service.img}`} alt={service.title} className="card-img-top" />
                  <div className="card-body text-center">
                    <h5 className="card-title">{service.title}</h5>
                    <p className="card-text">{service.text}</p>
                    <button className="btn btn-primary">פרטים נוספים</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* אזור אודות */}
      <section className="about bg-dark py-5">
        <div className="container text-center">
          <h2 style={{ color: "white" }} className="mb-4 me-2">אודותינו</h2>
          <p style={{ color: "white" }}>
            מוסך מקצועי המציע שירותי תיקון, תחזוקה ושדרוג לכל סוגי הרכבים עם דגש על אמינות, מהירות ושירות אישי.
          </p>
        </div>
      </section>

      {/* טופס יצירת קשר */}
      <section className="contact-form-section bg-dark py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card shadow p-4">
                <h3 className="text-center mb-4">צור קשר</h3>
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-3">
                      <label htmlFor="name" className="form-label">שם מלא</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="הכנס את שמך"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="email" className="form-label">אימייל</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="הכנס את כתובת האימייל שלך"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="phone" className="form-label">טלפון</label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        placeholder="מספר טלפון"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="message" className="form-label">הודעה</label>
                      <input
                        type="text"
                        className="form-control"
                        id="message"
                        placeholder="כתוב את הודעתך כאן"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <button type="submit" className="btn btn-primary">שלח הודעה</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ChatBot />
      <Footer />
    </div>
  );
}

export default Home;
