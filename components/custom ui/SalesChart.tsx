"use client";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const SalesChart = ({ data }: { data: any[] }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart className='w-full h-full' data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey='sales' stroke='#4A5653' />
                <CartesianGrid stroke='#B8C3BB' strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default SalesChart;