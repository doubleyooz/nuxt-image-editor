export const computePointInCanvas = (canvasRef: Ref<HTMLCanvasElement | null>, clientX: number, clientY: number) => {
    if (!canvasRef.value) {
        return null;
    }
    const boundingRect = canvasRef.value.getBoundingClientRect();

    return {
        x: clientX - boundingRect.left,
        y: clientY - boundingRect.top,
    };
};