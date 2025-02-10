#include <iostream>
#include <cmath>
using namespace std;

int main() { // comienza ejecución del programa las llaves encierran el cuerpo o definición de la función.

    const float PI = 3.14159; // Declara constante flotante PI
    float radio, area, volumen;

    cout << "Área y volumen de una esfera en cms.\n"; // cout -> console output
    cout << "\n¿Cuánto mide el radio?:\n"; // sentencias terminan siempre con ;
    cin >> radio; // cin -> console input

    area = PI * pow(radio, 2);
    cout << "\nEl área del círculo es:\n" << area;

    volumen = ((float)4 / (float)3) * PI * radio * radio * radio;
    cout << "\n\nEl volumen de la esfera es:\n" << volumen;

    return 0; // como main es función tipo entero, debe retornar algo y con 0 indica que el programa terminó con éxito.
} // Fin de la función main.
