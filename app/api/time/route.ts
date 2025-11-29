import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';


export async function GET() {
    try {
        const now = new Date();

        // Format to Asia/Kolkata time
        // en-CA outputs YYYY-MM-DD
        const formatter = new Intl.DateTimeFormat('en-CA', {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        const parts = formatter.formatToParts(now);
        const mapping: Record<string, string> = {};
        parts.forEach(p => mapping[p.type] = p.value);

        // Construct YYYY-MM-DDTHH:mm
        // Note: en-CA usually formats as YYYY-MM-DD, HH:mm:ss but formatToParts is safer
        const year = mapping.year;
        const month = mapping.month;
        const day = mapping.day;
        const hour = mapping.hour;
        const minute = mapping.minute;

        const isoString = `${year}-${month}-${day}T${hour}:${minute}`;

        return NextResponse.json({ datetime: isoString });
    } catch (error) {
        console.error('Time API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch time' }, { status: 500 });
    }
}
