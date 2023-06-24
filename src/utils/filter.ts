const grayFilter = (canvas: globalThis.Ref<HTMLCanvasElement | null>) => {
    if (!canvas.value) return;
    const ctx = canvas.value.getContext("2d");

    const originalArray = ctx!.getImageData(0, 0, 400, 400);
    for (let y = 0; y < originalArray.height; y++) {
        for (let x = 0; x < originalArray.width; x++) {
            let i = y * 4 * originalArray.width + x * 4;
            let avg =
                (originalArray.data[i] +
                    originalArray.data[i + 1] +
                    originalArray.data[i + 2]) /
                3;
            originalArray.data[i] = avg;
            originalArray.data[i + 1] = avg;
            originalArray.data[i + 2] = avg;
        }
    }
    ctx!.putImageData(
        originalArray,
        0,
        0,
        0,
        0,
        originalArray.width,
        originalArray.height
    );
};

export { grayFilter }