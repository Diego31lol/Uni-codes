#include <cstdlib>
#include <iostream>
#include "colors.h"

using namespace std;

struct Nodo {
    int data;
    Nodo *next;
};

// Prototipos de funciones
void menu();
void insertarLista(Nodo *&, int);
void mostrarLista(Nodo *);

Nodo *head = NULL;

int main() {
    system("cls");
    cout << MAGENTA << BG_YELLOW;
    menu();
    return 0;
}

void menu() {
    int opcion, n;
    bool loop = true;

    do {
        cout << "\t Menú - Lista Dinámica Simplemente Enlazada\n";
        cout << "1. Insertar elemento en la lista\n";
        cout << "2. Mostrar lista\n";
        cout << "3. Salir\n";
        cout << "Seleccione una opción: ";
        cin >> opcion;

        switch (opcion) {
            case 1:
                cout << "\nIngrese un número entero: ";
                cin >> n;
                insertarLista(head, n);
                break;
            case 2:
                mostrarLista(head);
                break;
            case 3:
                loop = false;
                break;
            default:
                cout << "Opción no válida, intente de nuevo.\n";
        }
    } while (loop);
}

// Función para insertar un nodo en la lista en orden ascendente
void insertarLista(Nodo *&head, int n) {
    Nodo *new_nodo = new Nodo();
    new_nodo->data = n;
    Nodo *tail = head;
    Nodo *aux = NULL;

    while ((tail != NULL) && (tail->data < n)) {
        aux = tail;
        tail = tail->next;
    }

    if (head == tail) {
        head = new_nodo;
    } else {
        aux->next = new_nodo;
    }

    new_nodo->next = tail;
    cout << "\nElemento insertado a la lista\n\n";
}

// Función para mostrar los elementos de la lista
void mostrarLista(Nodo *head) {
    Nodo *actual = head;
    cout << "\nElementos en la lista: ";
    while (actual != NULL) {
        cout << actual->data << " -> ";
        actual = actual->next;
    }
    cout << "NULL\n";
}
