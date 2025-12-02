import React, { useState, useEffect, useRef } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './ChartViewer.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const ChartViewer = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const chartRef = useRef(null);

    const totalCharts = 3; // We have 3 fixtures

    useEffect(() => {
        fetchChartData(currentIndex);
    }, [currentIndex]);

    const fetchChartData = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:3000/api/dataset/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setChartData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 1 ? totalCharts : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === totalCharts ? 1 : prevIndex + 1
        );
    };

    if (loading) {
        return (
            <div className="chart-viewer-container">
                <div className="loading">Loading chart data...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="chart-viewer-container">
                <div className="error">Error: {error}</div>
            </div>
        );
    }

    if (!chartData) {
        return null;
    }

    const data = {
        labels: chartData.labels,
        datasets: [
            {
                label: chartData.label,
                data: chartData.data,
                borderColor: chartData.borderColor || 'rgb(75, 192, 192)',
                backgroundColor: chartData.backgroundColor || 'rgba(75, 192, 192, 0.2)',
                tension: 0.3,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: chartData.title,
                font: {
                    size: 18,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="chart-viewer-container">
            <div className="chart-header">
                <h2>Data Visualization Dashboard</h2>
                <p className="chart-counter">
                    Chart {currentIndex} of {totalCharts}
                </p>
            </div>

            <div className="chart-wrapper">
                <button
                    className="nav-button nav-button-left"
                    onClick={handlePrevious}
                    aria-label="Previous chart"
                >
                    ←
                </button>

                <div className="chart-container">
                    <Line ref={chartRef} data={data} options={options} />
                </div>

                <button
                    className="nav-button nav-button-right"
                    onClick={handleNext}
                    aria-label="Next chart"
                >
                    →
                </button>
            </div>

            {chartData.description && (
                <div className="chart-description">
                    <p>{chartData.description}</p>
                </div>
            )}
        </div>
    );
};

export default ChartViewer;