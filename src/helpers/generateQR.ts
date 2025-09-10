export const generateDownloadableQrCode = (cropId: string) => {
    const canvas = document.getElementById('qr-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const svg = document.getElementById(`qrcode-${cropId}`)?.querySelector('svg');
    if (!svg) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const xml = new XMLSerializer().serializeToString(svg);
    const svg64 = btoa(xml);
    const image64 = 'data:image/svg+xml;base64,' + svg64;

    const img = new Image();
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngFile;
        downloadLink.download = `${cropId}-qrcode.png`;
        downloadLink.click();
    };
    img.src = image64;
};
