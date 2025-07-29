/**
 * Simple PieChart SVG component
 */
export function PieChart({ data, colors, size = 64 }: { data: number[]; colors: string[]; size?: number }) {
    // Ensure grey is always last in clockwise order
    let pieData = data;
    let pieColors = colors;
    // Find grey color index (assume #eee is grey)
    const greyIdx = colors.findIndex(c => c.toLowerCase() === '#eee');
    if (greyIdx !== -1 && greyIdx !== data.length - 1) {
        // Move grey segment to the end
        const newData = [...data];
        const newColors = [...colors];
        const greyValue = newData.splice(greyIdx, 1)[0];
        const greyColor = newColors.splice(greyIdx, 1)[0];
        newData.push(greyValue);
        newColors.push(greyColor);
        pieData = newData;
        pieColors = newColors;
    }
    const total = pieData.reduce((sum, val) => sum + val, 0);
    let startAngle = 0;
    const center = size / 2;
    const radius = size / 2;

    // Helper to describe an arc, with optional border for visually distinct segments
    function describeArc(start: number, end: number, color: string, border: boolean) {
        const startRadians = (start - 90) * (Math.PI / 180);
        const endRadians = (end - 90) * (Math.PI / 180);
        const x1 = center + radius * Math.cos(startRadians);
        const y1 = center + radius * Math.sin(startRadians);
        const x2 = center + radius * Math.cos(endRadians);
        const y2 = center + radius * Math.sin(endRadians);
        const largeArc = end - start > 180 ? 1 : 0;
        // Add a white border between segments if border is true
        const stroke = border ? 'white' : 'none';
        const strokeWidth = border ? 2 : 0;
        return (
            `<path d="M${center},${center} L${x1},${y1} A${radius},${radius} 0 ${largeArc} 1 ${x2},${y2} Z" fill="${color}" stroke="${stroke}" stroke-width="${strokeWidth}" />`
        );
    }

    let paths = "";
    for (let i = 0; i < pieData.length; i++) {
        const value = pieData[i];
        const angle = (value / total) * 360;
        const endAngle = startAngle + angle;
        // Add a white border between all segments
        const border = true;
        paths += describeArc(startAngle, endAngle, pieColors[i % pieColors.length], border);
        startAngle = endAngle;
    }

    return (
        <svg width= { size } height = { size } viewBox = {`0 0 ${size} ${size}`
}>
    <circle r={ radius } cx = { center } cy = { center } fill = "#eee" />
        <g dangerouslySetInnerHTML={ { __html: paths } } />
            </svg>
  );
}