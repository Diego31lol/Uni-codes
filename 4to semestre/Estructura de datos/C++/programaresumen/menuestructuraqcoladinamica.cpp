#include <iostream>
using namespace std;

struct Nodo {
    int valor;
    Nodo* sig;
};

void encolar(Nodo*& frente, Nodo*& fin, int val) {
    Nodo* nuevo = new Nodo{val, nullptr};
    if (!frente) frente = fin = nuevo;
    else {
        fin->sig = nuevo;
        fin = nuevo;
    }
}

void mostrarCola(Nodo* frente) {
    while (frente) {
        cout << frente->valor << " ";
        frente = frente->sig;
    }
    cout << endl;
}

int main() {
    Nodo* frente = nullptr;
    Nodo* fin = nullptr;
    encolar(frente, fin, 10);
    encolar(frente, fin, 20);
    mostrarCola(frente);
    return 0;
}

