export const computePointInCanvas = (canvasRef: HTMLCanvasElement | null, clientX: number, clientY: number) => {
    if (!canvasRef) {
        return null;
    }
    const boundingRect = canvasRef.getBoundingClientRect();
    //console.log(boundingRect)
    return {
        x: clientX - boundingRect.left,
        y: clientY - boundingRect.top,
    };
};