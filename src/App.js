import React, { useState, useEffect, useRef } from 'react';
import Print from './print';
import CanvasSignature from './CanvasSignature';
import "./App.css";

const App = () => {

  const [formData, setFormData] = useState({ firstName: "", lastName: "", misparT: "", shoerMelave: "" });

  const [exportDoch, setExportDoch] = useState(false);
  const [imgCanvas, setImgCanvas] = useState(false);
  const canvasElement = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignatureChange = () => {
    setImgCanvas(canvasElement.current?.toDataURL())
  }

  return (
    <div className="form-container">
      <h1>טופס כניסת אסיר לאשפוז</h1>
      <form>
        <label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="שם אסיר" />
        </label>
        <label>
          <input type="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="שם משפחה" />
        </label>
        <label>
          <input type="text"
            name="misparT"
            value={formData.misparT}
            onChange={handleChange}
            placeholder="מספר אסיר" />
        </label>

        <div style={{ width: "70%", margin: "0 auto", fontFamily: "Arial, sans-serif", lineHeight: "1.6", direction: "rtl", textAlign: "right" }}>
          <h1>קבלת תנאים רפואיים והבנת משמעות הסעיפים</h1>
          <section>
            <h2>מבוא</h2>
            <p>
              <span>תהליך קבלת תנאים רפואיים</span>
              עשוי להיות מורכב, ודורש תשומת לב לפרטים הקטנים.
              <span>מסמכים רפואיים</span>
              רבים כוללים סעיפים שמטרתם להגדיר את זכויות המטופל, חובותיו, ואת דרכי ההתנהלות מול הגורם המטפל.
            </p>
          </section>
          <section>
            <h2>הבנת הסעיפים</h2>
            <div>
              <p> בכל הסכם רפואי
                <span>חשוב לקרוא בעיון</span>
                את כלל הסעיפים המפורטים. לדוגמה, סעיפים הנוגעים ל:
              </p>
              <ul>
                <li>כיסוי ביטוחי והגבלותיו</li>
                <li>זכאות לשירותים רפואיים</li>
                <li>דרכי פנייה במקרה של סכסוך או תלונה</li>
              </ul>
            </div>
          </section>
          <section>
            <h2>מה חשוב לבדוק?</h2>
            <div>
              <p> לפני החתימה על מסמך רפואי, בדוק: </p>
              <ul>
                <li>שהפרטים האישיים שלך נכונים.</li>
                <li>שההסכם כולל את כל השירותים שאתה מצפה לקבל.</li>
                <li>שאין סעיפים "קטנים" שמגבילים אותך בצורה שאינה נוחה לך.</li>
              </ul>
              <p> מומלץ להתייעץ עם
                <span>יועץ משפטי</span> או
                <span>מומחה בתחום</span>
                כדי לוודא שהבנת את המסמך במלואו. </p>
            </div>
          </section>
          <section>
            <h2>זכויות המטופל</h2>
            <div>
              <p> זכויות המטופל הן מרכיב קריטי בהסכמים רפואיים. כל אדם זכאי ל: </p>
              <ul>
                <li>מידע ברור ושקוף על הטיפול המוצע.</li>
                <li>שמירה על פרטיות המידע הרפואי שלו.</li>
                <li>זכות לבחור ולהחליט על הטיפול שהוא מקבל.</li>
              </ul>
            </div>
          </section>
          <section>
            <h2>סיכום</h2>
            <p>
              <span>קבלת תנאים רפואיים</span>
              מחייבת הבנה מעמיקה של משמעות הסעיפים.
              <span>אל תמהר לחתום</span>
              על מסמכים מבלי להבין אותם במלואם, ובמידת הצורך פנה למומחה שיעזור לך. זכור, הבנת תנאים אלו תבטיח שתקבל את השירותים המגיעים לך ללא עיכובים או בעיות עתידיות.
            </p>
          </section>
        </div>


        <label>
          <input type="text"
            name="shoerMelave"
            value={formData.shoerMelave}
            onChange={handleChange}
            placeholder="סוהר מלווה" />
        </label>

        <CanvasSignature handleSignatureChange={handleSignatureChange} ref={canvasElement} />

        <button type="button"
          onClick={() => setExportDoch(true)}>
          הפקת טופס
        </button>
      </form>

      <Print formData={formData} exportDoch={exportDoch} setExportDoch={setExportDoch} signatureSrc={imgCanvas} />

    </div>
  );
};
export default App;


