#include <iostream>
#include <string>
using namespace std;

struct Nodo {
    string cancion;
    Nodo* siguiente;
};

void reproducir(Nodo* actual) {
    if (actual)
        cout << "Reproduciendo la cancion: " << actual->cancion << endl;
}

int main() {
    Nodo* head = new Nodo{"Cancion 1", nullptr};
    Nodo* nodo2 = new Nodo{"Cancion 2", nullptr};
    Nodo* nodo3 = new Nodo{"Cancion 3", nullptr};

    head->siguiente = nodo2;
    nodo2->siguiente = nodo3;
    nodo3->siguiente = head;

    Nodo* actual = head;

    char opc;
    do {
        cout << "¿Reproducir cancion actual? (s/n): ";
        cin >> opc;
        if (opc == 's') {
            reproducir(actual);
            actual = actual->siguiente;
        }
    } while (opc != 'n');

    return 0;
}
