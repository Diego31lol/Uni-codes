#include <iostream>
#include <limits>
using namespace std;

int sumar(int a, int b) {
    return a + b;
}

void intercambiar(int &a, int &b) {
    int temp = a;
    a = b;
    b = temp;
}

int leerNumEntero() {
    int n;
    while (true) {
        cout << "Ingresa un numero entero: ";
        cin >> n;

        if (cin.fail()) {
            cin.clear(); // limpia error
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            cout << "Error: Solo debes ingresar numeros enteros." << endl;
        } else {
            return n;
        }
    }
}

int main() {
    int num1 = leerNumEntero();
    int num2 = leerNumEntero();

    cout << "La suma es: " << sumar(num1, num2) << endl;

    intercambiar(num1, num2);
    cout << "Valores intercambiados: num1 = " << num1 << ", num2 = " << num2 << endl;

    return 0;
}
