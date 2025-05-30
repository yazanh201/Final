import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";


const Appointments = ({ onSelectTreatment, filterAppointmentNumber }) => {
  const navigate = useNavigate(); // ☑️ בתוך הקומפוננטה
  const [modalType, setModalType] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  

  const [selectedAppointment, setSelectedAppointment] = useState({
    date: "",
    time: "",
    description: "",
    idNumber: "",
    name: "",
    carNumber: "",
    treatmentId: ""
  });

  useEffect(() => {
    if (filterAppointmentNumber) {
      fetch(`http://localhost:5000/api/appointments/by-number/${filterAppointmentNumber}`)
        .then((res) => res.json())
        .then((data) => {
          const result = Array.isArray(data) ? data : [data];
          setAppointments(result);
        })
        .catch((err) => console.error("❌ שגיאה בשליפת תור לפי מזהה:", err));
    } else {
      fetchAppointments();
    }
  }, [filterAppointmentNumber]);
  

  const fetchAvailableTimes = async (date) => {
  if (!date) return;
  const res = await fetch(`http://localhost:5000/api/appointments/available-times/${date}`);
  const data = await res.json();
  setAvailableTimes(data);
};


  const fetchAppointments = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/appointments");
      const data = await res.json();
      setAppointments(data);
    } catch (error) {
      console.error("❌ שגיאה בשליפת תורים:", error);
    }
  };

  const handleShowModal = (type, appointment = null) => {
  setModalType(type);
  if (type === "edit" && appointment) {
    setSelectedAppointment(appointment);
    setSelectedDate(appointment.date);
    fetchAvailableTimes(appointment.date);
  } else {
    setSearchTerm("");
  }
};


  const handleCloseModal = () => {
    setModalType(null);
    setSelectedAppointment(null);
    setSearchTerm("");
  };

  const handleSave = async () => {
  try {
    if (modalType === "edit") {
      const res = await fetch(`http://localhost:5000/api/appointments/${selectedAppointment._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedAppointment),
      });
      const updated = await res.json();
      setAppointments((prev) =>
        prev.map((a) => (a._id === updated._id ? updated : a))
      );
      alert("✅ התור עודכן בהצלחה!");
    }
  } catch (err) {
    console.error("❌ שגיאה בשמירה:", err);
    alert("❌ שגיאה בשמירה");
  }
  handleCloseModal();
};



  const handleSearchById = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/appointments/by-id/${searchTerm}`);
      const data = await res.json();
      setAppointments(data);
      handleCloseModal();
    } catch (error) {
      console.error("❌ שגיאה בחיפוש לפי תעודת זהות:", error);
    }
  };

  const handleSearchByDate = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/appointments/by-date/${searchTerm}`);
      const data = await res.json();
      setAppointments(data);
      handleCloseModal();
    } catch (error) {
      console.error("❌ שגיאה בחיפוש לפי תאריך:", error);
    }
  };


  const handleSearchByIdOrCar = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/appointments/search/${searchTerm}`);
      const data = await res.json();
      setAppointments(data);
      handleCloseModal();
    } catch (error) {
      console.error("❌ שגיאה בחיפוש לפי ת\"ז או מספר רכב:", error);
    }
  };
  

  return (
    <div>
      <div className="text-center mb-4">
        <h2 className="me-3">תורים</h2>
      </div>

      <div className="d-flex mb-3">
        <button className="btn btn-primary me-3" onClick={() => handleShowModal("searchID")}>
          חיפוש לפי ת"ז או מספר רישוי
        </button>

        <button className="btn btn-primary me-3" onClick={() => handleShowModal("searchDate")}>
          חיפוש לפי תאריך
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>מזהה תור</th>
              <th>תאריך</th>
              <th>שעה</th>
              <th>תיאור</th>
              <th>תעודת זהות</th>
              <th>שם לקוח</th>
              <th>טלפון</th>
              <th>מספר רישוי</th>
              <th>מזהה טיפול</th>
              <th>סטטוס הגעה</th>
              <th>פעולה</th>
            </tr>
          </thead>
          <tbody>
          {appointments
            ?.filter(appointment => appointment && appointment.appointmentNumber) // סינון רשומות חסרות
            .map((appointment) => (
              <tr key={appointment._id || appointment.treatment?._id || Math.random()}>
                <td>{appointment.appointmentNumber}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.description}</td>
                <td>{appointment.idNumber}</td>
                <td>{appointment.name}</td>
                <td>{appointment.phoneNumber || "—"}</td>
                <td>{appointment.carNumber}</td>
                <td>
                  {appointment.treatment?.treatmentId ? (
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        onSelectTreatment(appointment.appointmentNumber);
                      }}
                      style={{
                        textDecoration: "underline",
                        color: "blue",
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer"
                      }}
                    >
                      {appointment.treatment.treatmentId}
                    </a>
                  ) : '—'}
                </td>
                <td>{appointment.arrivalStatus || "בהמתנה"}</td>
                <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() =>
                    navigate(`/appointments/edit/${appointment._id}`, {
                      state: {
                        _id: appointment._id,
                        date: appointment.date,
                        time: appointment.time,
                        description: appointment.description,
                        idNumber: appointment.idNumber,
                        name: appointment.name,
                        phoneNumber: appointment.phoneNumber,
                        carNumber: appointment.carNumber,
                        appointmentNumber: appointment.appointmentNumber,
                        arrivalStatus: appointment.arrivalStatus
                      }
                    })
                  }
                >
                  עריכה
                </button>


                </td>
              </tr>
          ))}

          </tbody>
        </table>
      </div>

      {/* מודלים */}
      {modalType === "searchID" && (
        <Modal isOpen={true} onClose={handleCloseModal} onSave={handleSearchByIdOrCar}>
          <h3>חיפוש לפי ת"ז או מספר רכב</h3>
          <input
            type="text"
            className="form-control"
            placeholder="חיפוש לפי ת'ז או מספר רכב"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Modal>
      )}


      {modalType === "searchDate" && (
        <Modal isOpen={true} onClose={handleCloseModal} onSave={handleSearchByDate}>
          <h3>חיפוש לפי תאריך</h3>
          <input
            type="date"
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Modal>
      )}
    </div>
  );
};

export default Appointments;