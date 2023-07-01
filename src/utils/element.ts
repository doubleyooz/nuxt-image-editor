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

export const rgbToHex = (red: number, green: number, blue: number): string => {
    // Ensure the input values are within the valid range
    const validatedRed = clamp(red, 0, 255);
    const validatedGreen = clamp(green, 0, 255);
    const validatedBlue = clamp(blue, 0, 255);

    // Convert the RGB values to hexadecimal
    const hexRed = validatedRed.toString(16).padStart(2, '0');
    const hexGreen = validatedGreen.toString(16).padStart(2, '0');
    const hexBlue = validatedBlue.toString(16).padStart(2, '0');

    // Combine the hexadecimal values
    const hexColor = `#${hexRed}${hexGreen}${hexBlue}`;

    return hexColor;
}

// Helper function to clamp a value within a range
export const clamp = (value: number, min: number, max: number): number => {
    return Math.max(min, Math.min(value, max));
}