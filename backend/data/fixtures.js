export const datasets = [
    {
        id: '1',
        title: 'Monthly Sales Revenue 2024',
        label: 'Revenue ($1000s)',
        description: 'Monthly sales revenue tracking for Q1-Q3 2024',
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'],
        data: [65, 72, 81, 78, 95, 103, 110, 118, 125],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        metadata: {
            category: 'sales',
            year: 2024,
            unit: 'thousands'
        }
    },
    {
        id: '2',
        title: 'Website Traffic Analytics',
        label: 'Daily Visitors',
        description: 'Average daily website visitors over the past 7 days',
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        data: [1250, 1580, 1420, 1890, 2100, 2450, 2280],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        metadata: {
            category: 'analytics',
            period: 'weekly',
            unit: 'visitors'
        }
    },
    {
        id: '3',
        title: 'Product Performance Index',
        label: 'Performance Score',
        description: 'Quarterly product performance metrics across different categories',
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        data: [78, 85, 92, 88],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.2)',
        metadata: {
            category: 'performance',
            year: 2024,
            unit: 'score'
        }
    }
];