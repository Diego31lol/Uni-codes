#include <iostream>
using namespace std;

void solicitaCalif(float calif[], int tam) {
    for (int i = 0; i < tam; i++) {
        cout << "Calificación del alumno " << i+1 << ": ";
        cin >> calif[i];
    }
}

float calificacionPromedio(float calif[], int tam) {
    float suma = 0;
    for (int i = 0; i < tam; i++) {
        suma += calif[i];
    }
    return suma / tam;
}

int mayorMenorPromedio(float calif[], int tam, float prom) {
    int contador = 0;
    for (int i = 0; i < tam; i++) {
        if (calif[i] > prom)
            contador++;
    }
    return contador;
}

void mostrarResultados(float calif[], int tam, float prom, int mayores) {
    cout << "\n=== Resultados ===\n";
    for (int i = 0; i < tam; i++) {
        cout << "Alumno " << i+1 << ": " << calif[i] << endl;
    }
    cout << "Promedio: " << prom << endl;
    cout << "Calificaciones mayores al promedio: " << mayores << endl;
}

int main() {
    const int tam = 10;
    float calif[tam];

    solicitaCalif(calif, tam);
    float prom = calificacionPromedio(calif, tam);
    int mayores = mayorMenorPromedio(calif, tam, prom);
    mostrarResultados(calif, tam, prom, mayores);

    return 0;
}
