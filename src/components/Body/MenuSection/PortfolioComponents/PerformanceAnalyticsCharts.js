
import {
    ResponsiveContainer, Legend, LabelList, Cell, Tooltip,
    PieChart, Pie,
    BarChart, Bar,
    LineChart, Line, ReferenceLine
} from "recharts";





export const BaseLine = ({ height = 200, centerLine = 1, data = data }) => {

    /*
    const gradientOffset = () => {
        const dataMax = Math.max(...data.map((i) => i.index));
        const dataMin = Math.min(...data.map((i) => i.index));
    
        if (dataMax <= 0) {
            return 0;
        }
        if (dataMin >= 0) {
            return 1;
        }
    
        return dataMax / (dataMax - dataMin);
    };
    
    const off = gradientOffset();
    */
    return <ResponsiveContainer width="100%" height={height}>
        <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 50,
                right: 50,
                left: 20,
                bottom: 5,
            }}
        >
            <ReferenceLine y={centerLine} stroke="#B4F8A6" strokeDasharray="3 3" />
            <Line type="monotone" dataKey="index" stroke="#00a0e3" dot={false} />
            <Line type="monotone" dataKey="compareIndex" stroke="#404040" dot={false} />
        </LineChart>

    </ResponsiveContainer>
}


const colorCodes = ['#4FBA25', '#0097FC', '#F99509', '#FF4130', '#404040','#2274a5', '#FC9211', '#e51a4b','#379F1B', '#0075D8',
    '#D67606', '#DB2323', '#372E2F', '#185A8D', '#D8730C', '#C4134F', '#238512', '#0057B5', '#B35B04', '#B71825', '#2E2022',
    '#114476', '#B55708', '#A40D4E', '#136B0B', '#003D92', '#904302', '#930F25', '#251418', '#0A305F', '#923F05', '#84084A', '#075907',
    '#002C78', '#773201', '#7A0925', '#1E0C12', '#06224F', '#782E03', '#6D0446']

export const PiChart = ({ height = 150, fill = "#8884d8", dataKey = "value", data = data, radius = radius}) => 

    <ResponsiveContainer width="95%" height={height + 100} >
        <PieChart>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                height={height}
                outerRadius={radius[1]}
                innerRadius={radius[0]}
                paddingAngle={1}
                stroke="none"
                fill={fill}
                dataKey={dataKey}
                labelLine={false}
                label={({ cx, cy, midAngle, outerRadius, name, value }) => {
                    const RADIAN = Math.PI / 180,
                        sin = Math.sin(-RADIAN * midAngle),
                        cos = Math.cos(-RADIAN * midAngle),
                        sx = cx + (outerRadius) * cos,
                        sy = cy + (outerRadius) * sin,
                        mx = cx + (outerRadius + 10) * cos - 5,
                        my = cy + (outerRadius + 10) * sin,
                        ex = mx + (cos >= 0 ? 1 : -1) * 8,
                        ey = my,
                        textAnchor = cos >= 0 ? 'start' : 'end';
                    return (
                        <>
                            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
                            <text x={ex + (cos >= 0 ? 1 : -1) * 3} y={ey} textAnchor={textAnchor} fontSize="8" fill="#333">
                                {`${(name.charAt(0).toUpperCase()+name.slice(1)).split('_').join(' ') }-${parseFloat(value).toFixed(2)}%`}
                            </text>
                        </>
                    );
                }}
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colorCodes[index]} />
                ))}

            </Pie>
        </PieChart>
    </ResponsiveContainer>


/*
const PositiveAndNegativeBarChart_Data = [
    { percentage: 4.93 },
    { percentage: 3.83 },
    { percentage: 2.73 },
    { percentage: 1.63 },
    { percentage: -1.50 },
    { percentage: -2.73 },
    { percentage: -3.83 },
    { percentage: -4.93 },
];

export const PositiveAndNegativeBarChart = ({ height = 200, payload = PositiveAndNegativeBarChart_Data, dataKey = "percentage" }) =>
    <ResponsiveContainer width="100%" height={height} >
        <BarChart height={height} data={payload} >
            <Bar dataKey={dataKey} fill="#00000075">
                {payload.map((entry, index) => <Cell fill={entry[dataKey] > 0 ? '#1be486' : '#e41a4a'} key={`cell-${index}`} />)}
                <LabelList content={({ x, y, value }) =>
                    <g>
                        <text x={x + 2} y={y - 5} fill="#000" fontSize="12" textAnchor="top" dominantBaseline="middle">
                            {value > 0 ? value + '%' : ''}
                        </text>
                    </g>
                } />
            </Bar>
        </BarChart>
    </ResponsiveContainer>


*/
