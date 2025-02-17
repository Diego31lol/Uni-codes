#include <iostream> // Se incluye la librería correcta

using namespace std;

int main() {
    // Definición del arreglo con valores correctos
    int ArrNum[10] = {10, 20, 25, 30, 35, 40, 0, 0, 0, 0}; 

    // Definición del puntero apuntando al primer elemento del arreglo
    int* aptArrNum = ArrNum;

    // Imprimir mensaje de prueba
    cout << "Hola" << endl;

    // Acceder a los elementos del arreglo mediante el índice
    cout << "El elemento en la posicion [0] es: " << ArrNum[0] << endl;
    cout << "El elemento en la posicion [0] es: " << aptArrNum[0] << endl;

    cout << "El elemento en la posicion [2] es: " << ArrNum[2] << endl;
    cout << "El elemento en la posicion [2] es: " << aptArrNum[2] << endl;

    // Mostrar la dirección de memoria del elemento en la posición [2]
    cout << "La direccion de memoria de la posicion [2] es: " << &ArrNum[2] << endl;
    cout << "La direccion de memoria de la posicion [2] es: " << &aptArrNum[2] << endl;
    return 0; // Retorno exitoso del programa
}
