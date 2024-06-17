import React, { useEffect, useState } from 'react';
import styles from './informes.module.css'; // Importamos los estilos CSS
import { Bar } from 'react-chartjs-2';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'chart.js/auto';
import { Link } from 'react-router-dom';

const Informes = () => {
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [selectedHabitacion, setSelectedHabitacion] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [filteredData, setFilteredData] = useState([]);
    const [summary, setSummary] = useState({ totalDoorOpens: 0, totalMovement: 0 });

    const generateFictitiousData = () => {
        const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
        return hours.map(hour => ({
            timestamp: `12/06/2024 ${hour}`,
            value: (Math.random() * 20).toFixed(1),  // Fictitious movement data in minutes (up to 20 minutes)
            doorOpens: Math.floor(Math.random() * 5) // Fictitious door opens count
        }));
    };

    useEffect(() => {
        const fictitiousData = generateFictitiousData();
        setFilteredData(fictitiousData);
        const totalDoorOpens = fictitiousData.reduce((acc, item) => acc + item.doorOpens, 0);
        const totalMovement = fictitiousData.reduce((acc, item) => acc + parseFloat(item.value), 0);
        setSummary({ totalDoorOpens, totalMovement });
    }, [selectedHotel, selectedHabitacion, selectedDate]);

    const renderMovementChart = (habitaciones) => {
        const horas = habitaciones.map(h => h.timestamp.split(' ')[1]);
        const movimiento = habitaciones.map(h => parseFloat(h.value)); // Movimiento en minutos

        const chartData = {
            labels: horas,
            datasets: [
                {
                    label: 'Movimiento (minutos)',
                    data: movimiento,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 2,
                    hoverBackgroundColor: 'rgba(54, 162, 235, 0.5)',
                    hoverBorderColor: 'rgba(54, 162, 235, 1)',
                    yAxisID: 'y',
                },
            ],
        };

        const options = {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Hora',
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                        color: '#333'
                    },
                    ticks: {
                        autoSkip: false,
                        maxTicksLimit: 24,
                        font: {
                            size: 12
                        },
                        color: '#333'
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Movimiento (minutos)',
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                        color: '#333'
                    },
                    min: 0,
                    max: 20,
                    ticks: {
                        stepSize: 2,
                        font: {
                            size: 12
                        },
                        color: '#333',
                        callback: function(value) {
                            return value + " min";
                        }
                    },
                },
            },
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return `${tooltipItem.label}: ${tooltipItem.raw} min`;
                        }
                    },
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleFont: { size: 16 },
                    bodyFont: { size: 14 },
                    padding: 10,
                },
            },
            animation: {
                duration: 1500,
                easing: 'easeOutBounce'
            }
        };

        return <div className={styles.chartContainer}><Bar data={chartData} options={options} /></div>;
    };

    const renderDoorOpensChart = (habitaciones) => {
        const horas = habitaciones.map(h => h.timestamp.split(' ')[1]);
        const aperturas = habitaciones.map(h => h.doorOpens); // Aperturas de puerta

        const chartData = {
            labels: horas,
            datasets: [
                {
                    label: 'Aperturas de Puerta',
                    data: aperturas,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2,
                    hoverBackgroundColor: 'rgba(255, 99, 132, 0.5)',
                    hoverBorderColor: 'rgba(255, 99, 132, 1)',
                    yAxisID: 'y1',
                },
            ],
        };

        const options = {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Hora',
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                        color: '#333'
                    },
                    ticks: {
                        autoSkip: false,
                        maxTicksLimit: 24,
                        font: {
                            size: 12
                        },
                        color: '#333'
                    },
                },
                y1: {
                    title: {
                        display: true,
                        text: 'Aperturas de Puerta',
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                        color: '#333'
                    },
                    min: 0,
                    max: 5,
                    ticks: {
                        stepSize: 1,
                        font: {
                            size: 12
                        },
                        color: '#333',
                        callback: function(value) {
                            return value + " veces";
                        }
                    },
                },
            },
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return `${tooltipItem.label}: ${tooltipItem.raw} veces`;
                        }
                    },
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleFont: { size: 16 },
                    bodyFont: { size: 14 },
                    padding: 10,
                },
            },
            animation: {
                duration: 1500,
                easing: 'easeOutBounce'
            }
        };

        return <div className={styles.chartContainer}><Bar data={chartData} options={options} /></div>;
    };

    const hotelOptions = [
        { value: 'Hotel 1', label: 'Hotel 1' },
        { value: 'Hotel 2', label: 'Hotel 2' },
    ];

    const habitacionOptions = Array.from({ length: 30 }, (_, i) => ({
        value: `Habitación ${i + 1}`,
        label: `Habitación ${i + 1}`
    }));

    return (
        <div className={styles.contenedor}>
            <h2>Datos de los Dimaster</h2>
            <Link to={"/panelAdministrativo"}>
                <button className={styles.regresar}>Regresar</button>
            </Link>
            <div className={styles.filtros}>
                <div className={styles.filtro}>
                    <Select
                        options={hotelOptions}
                        onChange={hotel => {
                            setSelectedHotel(hotel);
                            setSelectedHabitacion(null); // Resetear habitación seleccionada
                            setFilteredData([]); // Limpiar datos filtrados
                        }}
                        placeholder="Selecciona un hotel"
                        className={styles.select}
                        classNamePrefix="select"
                    />
                </div>
                {selectedHotel && (
                    <div className={styles.filtro}>
                        <Select
                            options={habitacionOptions}
                            onChange={setSelectedHabitacion}
                            placeholder="Selecciona una habitación"
                            className={styles.select}
                            classNamePrefix="select"
                        />
                    </div>
                )}
                <div className={styles.filtro}>
                    <DatePicker
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        dateFormat="dd/MM/yyyy"
                        className={styles.datePicker}
                    />
                </div>
            </div>
            {selectedHabitacion && filteredData.length > 0 && (
                <div className={styles.seccionHotel}>
                    <h3>{selectedHotel.label} - {selectedHabitacion.label}</h3>
                    <div className={styles.grafico}>
                        <div className={styles.header}>
                            <h4>{selectedHabitacion.label}</h4>
                            <span className={styles.fecha}>{selectedDate.toLocaleDateString('es-ES')}</span>
                        </div>
                        {renderMovementChart(filteredData)}
                        {renderDoorOpensChart(filteredData)}
                    </div>
                    <div className={styles.informe}>
                        <h4>Informe del Día</h4>
                        <p><strong>Fecha:</strong> {selectedDate.toLocaleDateString('es-ES')}</p>
                        <p><strong>Total de Movimiento:</strong> {summary.totalMovement.toFixed(1)} minutos</p>
                        <p><strong>Total de Aperturas de Puerta:</strong> {summary.totalDoorOpens} veces</p>
                    </div>
                </div>
            )}
            {selectedHabitacion && filteredData.length === 0 && (
                <div className={styles.seccionHotel}>
                    <h3>{selectedHotel.label} - {selectedHabitacion.label}</h3>
                    <p>No hay datos disponibles para la fecha seleccionada.</p>
                </div>
            )}
        </div>
    );
};

export default Informes;
