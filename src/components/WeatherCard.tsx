import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// Tableau simple de correspondance weathercode → icône/emoji
const weatherIcons: { [key: number]: string } = {
    0: '☀️',
    1: '🌤️',
    2: '⛅',
    3: '☁️',
    45: '🌫️',
    48: '🌫️',
    51: '🌦️',
    53: '🌦️',
    55: '🌦️',
    56: '🌧️',
    57: '🌧️',
    61: '🌦️',
    63: '🌦️',
    65: '🌧️',
    66: '🌧️',
    67: '🌧️',
    71: '❄️',
    73: '❄️',
    75: '❄️',
    77: '❄️',
    80: '🌦️',
    81: '🌧️',
    82: '🌧️',
    85: '❄️',
    86: '❄️',
    95: '⛈️',
    96: '⛈️',
    99: '⛈️',
};

type WeatherCardProps = {
    item: {
        time: string;
        temperature: number;
        humidity: number;
        weathercode: number;
    };
};

const WeatherCard = ({ item }: WeatherCardProps) => (
    <View style={styles.card}>
        <View style={styles.left}>
            <Text style={styles.time}>{item.time.replace('T', ' ')}</Text>
            <Text style={styles.icon}>{weatherIcons[item.weathercode] || '❓'}</Text>
        </View>
        <View style={styles.right}>
            <Text style={styles.temp}>{item.temperature} °C</Text>
            <Text style={styles.humidity}>💧 {item.humidity} %</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        padding: 14,
        borderRadius: 10,
        backgroundColor: "#31353F",
        marginVertical: 6,
        elevation: 2,
    },
    left: { flexDirection: 'column', alignItems: 'flex-start' },
    time: { fontSize: 15, color: '#fff', marginBottom: 3 },
    icon: { fontSize: 26 },
    right: { alignItems: 'flex-end' },
    temp: { fontSize: 17, color: '#fff', fontWeight: 'bold' },
    humidity: { fontSize: 14, color: '#9ad0f5', marginTop: 2 },
});

export default WeatherCard;