import React, { useEffect, useRef, useState, forwardRef } from "react";

const CanvasSignature = forwardRef((handleSignatureChange, ref) => {

    const canvasCtxRef = useRef(null);

    const [signatureStart, setSignatureStart] = useState(false);
    const [color, setColor] = useState('#333333');
    const [img, setImg] = useState(null);
    let isDown = false;

    useEffect(() => {
        canvasCtxRef.current = ref.current.getContext('2d');
    }, [])

    const getMousePosition = (event) => {
        let rect = ref.current.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        }
    }

    const down = (event) => {
        // for mobile     
        if (event.type.toString() === 'touchstart') {
            let touch = event.touches[0];
            let rect = ref.current.getBoundingClientRect();
            isDown = true;
            canvasCtxRef.current.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
            canvasCtxRef.current.beginPath();
            canvasCtxRef.current.lineWidth = 5;
            canvasCtxRef.current.lineCap = 'round';
            canvasCtxRef.current.strokeStyle = color;
            return;
        }
        // for desktop
        let pos = getMousePosition(event);
        isDown = true;
        canvasCtxRef.current.moveTo(pos.x, pos.y);
        canvasCtxRef.current.beginPath();
        canvasCtxRef.current.lineWidth = 5;
        canvasCtxRef.current.lineCap = 'round';
        canvasCtxRef.current.strokeStyle = color;
    }

    const move = (event) => {
        if (isDown) {
            // for mobile     
            if (event.type.toString() === 'touchmove') {
                let touch = event.touches[0];
                let rect = ref.current.getBoundingClientRect();
                canvasCtxRef.current.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
                canvasCtxRef.current.stroke();
                return;
            }
            // for desktop
            let pos = getMousePosition(event);
            canvasCtxRef.current.lineTo(pos.x, pos.y);
            canvasCtxRef.current.stroke();
        }
    }

    const up = () => {
        isDown = false;
        setSignatureStart(true);
        handleSignatureChange?.handleSignatureChange(true);
    }

    const cleanCanvas = () => {
        canvasCtxRef.current.clearRect(0, 0, ref.current.width, ref.current.height);
        setSignatureStart(false);
        handleSignatureChange?.handleSignatureChange(false);
    }


    return (
        <div style={{
            display: "flex", flexDirection: "column", alignItems: "center"
        }}>
            <label style={{ fontFamily: 'Heebo-Medium' }}>:חתימת סוהר מלווה</label>
            <div style={{ display: "flex" }}>
                <button onClick={() => { cleanCanvas() }}>נקה</button>
                <canvas style={{ cursor: 'crosshair', border: '1px solid black' }} width="200" height="80" ref={ref} onMouseDown={(event) => { down(event) }} onTouchStart={(event) => { down(event) }} onMouseMove={(event) => { move(event) }} onTouchMove={(event) => { move(event) }} onMouseUp={(event) => { up(event) }} onTouchEnd={(event) => { up(event) }}></canvas>
            </div>
        </div >
    );
})

export default CanvasSignature;
