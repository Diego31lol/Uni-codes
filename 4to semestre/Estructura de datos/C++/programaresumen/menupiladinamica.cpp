#include <iostream>
using namespace std;

struct Nodo {
    int valor;
    Nodo* sig;
};

bool existe(Nodo* pila, int val) {
    while (pila) {
        if (pila->valor == val) return true;
        pila = pila->sig;
    }
    return false;
}

void push(Nodo*& pila, int val) {
    if (existe(pila, val)) {
        cout << "Valor repetido. No insertado.\n";
        return;
    }
    Nodo* nuevo = new Nodo{val, pila};
    pila = nuevo;
}

void vaciarPila(Nodo*& pila) {
    while (pila) {
        Nodo* temp = pila;
        pila = pila->sig;
        delete temp;
    }
}

void mostrar(Nodo* pila) {
    while (pila) {
        cout << pila->valor << " ";
        pila = pila->sig;
    }
    cout << endl;
}

int main() {
    Nodo* pila = nullptr;
    push(pila, 1);
    push(pila, 2);
    push(pila, 1); // valor repetido
    mostrar(pila);
    vaciarPila(pila);
    return 0;
}
