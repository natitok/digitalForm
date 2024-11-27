import React from 'react';
import { useEffect, useRef, useState } from 'react'
import styles from './print.module.css'
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import FORMSection from './FORMSection';


const Print = ({ formData, exportDoch, setExportDoch, signatureSrc }) => {

    const docTemplateRef = useRef(null);
    const footerTemplateRef = useRef(null);


    useEffect(() => {
        if (exportDoch)
            generatePDF();
    }, [exportDoch])

    const generatePDF = async () => {
        const a4Width = 595.28; // A4 width in points (210mm)
        const a4Height = 841.89; // A4 height in points (297mm)
        const topMargin = 20; // Top margin in points
        const bottomMargin = 30; // Bottom margin in points
        const element = document.getElementById('contentYLMK');
        element.style.display = "block";
        element.style.position = 'absolute'
        element.style.left = '-9999px'
        const input = docTemplateRef.current;
        const canvas = await html2canvas(input, {
            qulity: 1,
            scale: 2, // Increase scale to improve quality
            allowTaint: false
        });
        element.style.display = "none";
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        // Create a new PDF document
        const pdf = new jsPDF('p', 'pt', 'a4', true);
        pdf.setFont("Heebo-Regular", "normal");
        pdf.setR2L(true);
        // pdf.setb

        let yOffset = 0 + topMargin; // Initial Y offset for the first page
        const pageCanvas = document.createElement('canvas');
        const pageCtx = pageCanvas.getContext('2d');
        pageCanvas.width = imgWidth;
        pageCanvas.height = (a4Height - topMargin - bottomMargin) * (imgWidth / a4Width);

        while (yOffset < imgHeight) {
            // Clear the page canvas context
            pageCtx.clearRect(0, 0, pageCanvas.width, pageCanvas.height);
            // Draw the current section of the original canvas to the page canvas
            pageCtx.drawImage(canvas, 0, yOffset + topMargin, imgWidth, pageCanvas.height, 0, 0, imgWidth, pageCanvas.height);
            // Get the image data for the current slice
            const imgData = pageCanvas.toDataURL('image/png');
            // Add the image data to the PDF
            // pdf.addImage(imgData, 'PNG', 0, topMargin, a4Width, a4Height - topMargin - bottomMargin, '', 'FAST');
            pdf.addImage(imgData, 'PNG', 0, topMargin, a4Width, a4Height - topMargin - bottomMargin, '', 'FAST');

            yOffset += pageCanvas.height;

            if (yOffset < imgHeight) {
                pdf.addPage();
            }
        }

        // let fileName = getNameToFile();
        let fileName = "test";
        pdf.save(fileName);

        setExportDoch(false);
    };

    const Value = ({ val }) => <span style={{ fontWeight: "bold", marginRight: '10px' }}>{val}</span>
    const LightValue = ({ val }) => <span style={{ fontWeight: "normal", color: 'black' }}>{val}</span>

    return <>
        <div style={{ whiteSpace: 'break-spaces' }} id='contentYLMK' className={styles.hidePage} ref={docTemplateRef}>

            <div>
                <div className={styles.dFlex} style={{ gap: '50px', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <div className={styles.tyuta}>
                        טיוטה
                    </div>
                </div>
            </div>

            <div className={styles.title1}>כניסת אסיר לאשפוז</div>
            <FORMSection title={'פרטים אישיים:'}>
                <div style={{ width: '90%', margin: "0 auto" }} className={styles.dFlex}>
                    <div className={styles.colTh}>
                        <div>
                            <span className={styles.key}>
                                שם אסיר:
                            </span>
                            <Value val={formData.firstName} /></div>
                        <div>
                            <span className={styles.key}>
                                שם משפחה:
                            </span>
                            <Value val={formData.lastName} /></div>
                        <div>
                            <span className={styles.key}>
                                מספר אסיר:
                            </span>
                            <Value val={formData.misparT} />
                        </div>

                    </div>
                </div>
            </FORMSection>


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


            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: "80px", gap: "50px" }}>

                <div style={{ textAlign: 'left' }} className={styles.key}>
                    <div style={{ color: '#005AA5', }}> סוהר מלווה:  </div>
                    <div style={{ padding: '0 1px' }}>{"נתן טוקצינסקי"}</div>
                </div>

                <div style={{ textAlign: 'left' }} className={styles.key}>
                    <div style={{ paddingLeft: '34px' }}> חתימת סוהר מלווה:</div>
                    <img src={signatureSrc} style={{ backgroundColor: '#F5F5F5' }} width="180px" height="90px"></img>
                </div>
            </div>
        </div>
    </>
};

export default Print