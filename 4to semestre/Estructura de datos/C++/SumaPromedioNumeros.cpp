// Directivas de preprocesadores
#include <iostream>

using namespace std;

// Declaración de prototipos de funciones
int SumarNumeros(int, int, int);
float PromedioNumeros(int);

// Función main
int main() {
    int num1, num2, num3;

    // Pedir al usuario 3 números
    cout << "Ingresa el primer numero: ";
    cin >> num1;
    cout << "Ingresa el segundo numero: ";
    cin >> num2;
    cout << "Ingresa el tercer numero: ";
    cin >> num3;

    // Llamar a la función SumarNumeros
    int suma = SumarNumeros(num1, num2, num3);
    cout << "La suma de los numeros es: " << suma << endl;

    // Llamar a la función PromedioNumeros
    float promedio = PromedioNumeros(suma);
    cout << "El promedio de los numeros es: " << promedio << endl;

    return 0;
}

// Definiciones de funciones
int SumarNumeros(int a, int b, int c) {
    return a + b + c;
}

float PromedioNumeros(int suma) {
    return suma / 3.0; // División flotante
}
