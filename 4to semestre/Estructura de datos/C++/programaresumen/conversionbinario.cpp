#include <iostream>
using namespace std;

struct Nodo {
    int bit;
    Nodo* sig;
};

void push(Nodo*& pila, int bit) {
    pila = new Nodo{bit, pila};
}

void convertir(int num, Nodo*& pila) {
    while (num > 0) {
        push(pila, num % 2);
        num /= 2;
    }
}

void mostrar(Nodo* pila) {
    while (pila) {
        cout << pila->bit;
        pila = pila->sig;
    }
    cout << endl;
}

int main() {
    int numero;
    cout << "Ingresa numero decimal: ";
    cin >> numero;

    Nodo* pila = nullptr;
    convertir(numero, pila);
    cout << "Binario: ";
    mostrar(pila);

    return 0;
}

