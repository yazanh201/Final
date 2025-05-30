import React from 'react';
import './ServicesPage.css';
import Header from '../components/Header';
import Footer from '../components/footer';
import ChatBot from '../components/ChatBot';

// מערך שמכיל את כל הנתונים על השירותים
const servicesData = [
  {
    id: 1,
    title: 'בדיקת רישוי (טסט)',
    description: 'הן תהליך חיוני שמטרתו להבטיח שהרכב שלך בטוח לשימוש ועומד בתקנים המחמירים של משרד התחבורה. במהלך הבדיקה נבדקות מערכות הבטיחות כמו בלמים, הגה וחגורות, תקינות המנוע, תאורת הרכב, פליטת מזהמים, ושלמות השלדה והצמיגים. הבדיקה עוזרת לזהות תקלות נסתרות שיכולות לסכן את בטיחות הנוסעים ואת הנהגים האחרים בכביש, וכן מבטיחה עמידה בדרישות החוק. שמירה על תחזוקת הרכב באמצעות בדיקות אלו תורמת לבטיחותך, למניעת קנסות, לשימור ערך הרכב ולשמירה על הסביבה',
    image: '/img/p8.png',
  },
  {
    id: 2,
    title: 'אבחון תקלות',
    description: 'נועד לאתר תקלות במנוע ובמערכות החשמל ברכב בצורה מדויקת ומקצועית, תוך שימוש בציוד טכנולוגי מתקדם. תהליך האבחון כולל חיבור הרכב למכשירי דיאגנוסטיקה מתקדמים אשר מנתחים את מערכות הרכב ומציגים נתונים על ביצועיו, תקלות קיימות או פוטנציאליות, ותפקוד רכיבים שונים. שירות זה מאפשר לאתר בעיות נסתרות שאינן נראות לעין, כמו חוסר יעילות במנוע, תקלות במערכות החימום והקירור, בעיות במערכת הדלק או כשלים במערכות החשמל. באמצעות האבחון המתקדם, ניתן לטפל בתקלות במהירות וביעילות, למנוע נזקים חמורים יותר, ולשמור על תפקוד תקין של הרכב לאורך זמן',
    image: '/img/p2.jpeg',
  },
  {
    id: 3,
    title: 'שירות כללי',
    description: ' כולל טיפול מקיף ברכב המיועד לשמירה על תקינותו וביצועיו לאורך זמן. במסגרת השירות מבוצעות פעולות חיוניות כמו החלפת שמנים המבטיחים פעילות חלקה של המנוע, החלפת פילטרים (כגון פילטר שמן ופילטר אוויר) המסייעים לשמירה על זרימת אוויר ודלק נקיים, ובדיקות כלליות לאיתור בעיות פוטנציאליות. בדיקות אלו כוללות סקירה של מערכת הבלמים, מצב הצמיגים, מערכות החשמל, ותפקוד המנוע. שירות זה מסייע במניעת תקלות בלתי צפויות, מאריך את חיי הרכב ומשפר את בטיחות הנסיעה',
    image: '/img/p3.jpeg',
  },
  {
    id: 4,
    title: 'תיקון מערכת מיזוג',
    description: 'הוא שירות מקצועי שמטרתו להבטיח חוויית נהיגה נוחה ונעימה בכל תנאי מזג האוויר. במסגרת השירות מתבצע אבחון מקיף של מערכת המיזוג לאיתור תקלות כמו דליפות גז, בעיות בקומפרסור, מסננים סתומים או רכיבים בלויים. במידת הצורך, מתבצעת החלפת חלקים ותיקון מערכות לקירור יעיל. בנוסף, השירות כולל מילוי גז איכותי למיזוג אופטימלי ושדרוג טכנולוגי של המערכת להבטחת פעולה שקטה וחסכונית. טיפול מקצועי זה מבטיח רכב קריר ונעים בקיץ וחימום אפקטיבי בחורף, תוך שיפור איכות האוויר ברכב והפחתת עלויות תחזוקה בטווח הארוך',
    image: '/img/p5.jpg',
  },
  {
    id: 5,
    title: 'החלפת צמיגים',
    description: 'מספק פתרון מקצועי ובטיחותי להבטחת אחיזת כביש מיטבית וביצועים אופטימליים של הרכב. השירות כולל הסרה והחלפה של צמיגים בלויים או פגומים במבחר רחב של צמיגים איכותיים המתאימים לכל סוגי הרכבים, כולל רכבים פרטיים, מסחריים, 4x4 ורכבי יוקרה. במהלך ההחלפה מתבצע איזון גלגלים מדויק למניעת רעידות ושחיקה מוקדמת של הצמיגים. בנוסף, ניתן ייעוץ מקצועי להתאמת הצמיגים לתנאי הנסיעה והכביש. השירות מבטיח נהיגה חלקה, יציבה ובטוחה, תוך הארכת חיי הצמיגים ושמירה על תקינות מערכת ההיגוי והבלימה של הרכב',
    image: '/img/p4.jpeg',
  },
  {
    id: 6,
    title: 'תיקונים במנוע',
    description: 'תיקון מנוע הוא שירות מקצועי ומקיף שמטרתו להבטיח את תקינות המנוע וביצועיו האופטימליים לאורך זמן. השירות כולל אבחון מדויק של תקלות, תיקון ושיפוץ רכיבים חיוניים, וכן שימוש בחלקים איכותיים ובטכנולוגיות מתקדמות להחזרת המנוע למצבו האידיאלי. צוות המומחים מבצע בדיקות יסודיות כדי לזהות בעיות נסתרות, לשפר את יעילות הדלק ולמנוע שחיקה מואצת של רכיבי המנוע. טיפול זה מבטיח פעולה חלקה של הרכב, חוויית נהיגה משופרת ועמידות גבוהה בתנאי דרך משתנים, תוך שמירה על בטיחות ומהימנות לאורך זמן',
    image: '/img/p7.webp',
  },
];



const additionalServices = [
  { id: 1, title: 'בלמים', image: '/img/p10.jpg' },
  { id: 2, title: 'תיבת הילוכים', image: '/img/p11.jpg' },
  { id: 3, title: 'מצברים ', image: '/img/p12.webp' },
  { id: 4, title: 'בדיקות בטיחות', image: '/img/p13.jpg' },

];


const Services = () => {
  return (
    <>
    <Header/>
    <section className='hero2 d-flex align-items-center justify-content-center'>
      <div className="text-center text-white">
        <h1 className="display-4 ">השירותים שלנו במוסך MotorSport</h1>
        <p className="lead">
          מגוון שירותים מקצועיים לרכב שלך: אבחון תקלות, טיפולים תקופתיים, החלפת צמיגים ועוד
        </p>
      <a href="/Contact" className="btn btn-light btn-lg mt-3">
        קבע תור עכשיו
      </a>
  </div>
</section>


    <section className="services bg-dark py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="text-white me-3">השירותים שלנו</h2>
          <p className="text-muted">מה אנחנו עושים</p>
        </div>
        {/* רינדור של כל השירותים מתוך המערך */}
        {servicesData.map((service, index) => (
          <div className="row service-card mb-5" key={service.id}>
            {index % 2 === 0 ? (
              <>
                <div className="col-md-6">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="img-fluid"
                  />
                </div>  
                <div className="col-md-6 text-end">
                  <h3 className="text-white">{service.title}</h3>
                  <p className="text-white">{service.description}</p>
                </div>
              </>
            ) : (
              <>
               {/* אם index אי-זוגי, התמונה בצד ימין והטקסט בצד שמאל */}
                <div className="col-md-6 order-md-2">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="img-fluid rounded"
                  />
                </div>
                <div className="col-md-6 text-start order-md-1">
                  <h3 className="text-white">{service.title}</h3>
                  <p className="text-white">{service.description}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <section className="additional-services bg-dark py-5">
  <div className="container">
    <div className="additional-services">
      {additionalServices.map((service) => (
        <div className="col-md-4 mb-4" key={service.id}>
          <div className="additional-service-card">
            <img
              src={service.image}
              alt={service.title}
              className="service-card-img"
            />
            <h5 className="text-white">{service.title}</h5>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
    </section>
    <ChatBot/>
    <Footer/>
    </>
  );
};

export default Services;