import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { fetchWeatherByCity } from '../utils/api';
import WeatherCard from '../components/WeatherCard';

const HomeScreen = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const getWeather = async () => {
        if (!city) {
            Alert.alert('Erreur', 'Veuillez entrer une ville');
            return;
        }
        setLoading(true);
        try {
            const data = await fetchWeatherByCity(city);
            if (
                data &&
                data.hourly &&
                data.hourly.temperature_2m &&
                data.hourly.relative_humidity_2m &&
                data.hourly.weathercode
            ) {
                // Heure locale de l'utilisateur
                const now = new Date();
                const hourStr = now.getHours().toString().padStart(2, '0') + ':00';

                // Filtrer pour n’afficher qu’une entrée par jour à cette heure locale
                const filtered: any[] = [];
                const daysDone: Record<string, boolean> = {};

                data.hourly.time.forEach((datetime: string, idx: number) => {
                    const [date, hour] = datetime.split('T');
                    if (hour === hourStr && !daysDone[date]) {
                        filtered.push({
                            time: datetime,
                            temperature: data.hourly.temperature_2m[idx],
                            humidity: data.hourly.relative_humidity_2m[idx],
                            weathercode: data.hourly.weathercode[idx],
                        });
                        daysDone[date] = true;
                    }
                });

                setWeatherData(filtered);
            } else {
                Alert.alert('Erreur', 'Données indisponibles pour cette ville');
                setWeatherData([]);
            }
        } catch (e) {
            Alert.alert('Erreur', "Impossible d'obtenir la météo");
            setWeatherData([]);
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🌤️ Application Météo</Text>
            <TextInput
                placeholder="Entrez une ville (ex: Paris)  '©2025 by MoussahRantonirina' "
                value={city}
                onChangeText={setCity}
                style={styles.input}
                placeholderTextColor="#ccc"
            />
            <TouchableOpacity style={styles.button} onPress={getWeather} disabled={loading}>
                <Text style={styles.buttonText}>OBTENIR LA MÉTÉO</Text>
            </TouchableOpacity>
            {loading && <ActivityIndicator size="large" style={{ margin: 16 }} color="#fff" />}
            <FlatList
                data={weatherData}
                keyExtractor={item => item.time}
                renderItem={({ item }) => <WeatherCard item={item} />}
                style={{ marginTop: 10 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#23272F' },
    title: { fontSize: 26, fontWeight: 'bold', marginBottom: 18, color: '#fff', textAlign: 'center' },
    input: {
        borderWidth: 1, borderColor: '#3A4151', borderRadius: 8, marginBottom: 12, padding: 10, color: '#fff',
        backgroundColor: "#1A1D23",
    },
    button: {
        backgroundColor: "#3399ff", padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 8
    },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});

export default HomeScreen;